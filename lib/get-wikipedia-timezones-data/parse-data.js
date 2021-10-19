const cheerio = require('cheerio');
const removeDuplicatedCountries = require('./remove-duplicated-countries');

const CANONICAL_TYPE = 'Canonical';
const ALIAS_TYPE = 'Link';
const TABLE_SELECTOR = 'table.wikitable tbody';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';
const DEPRECATED_COLOR = '#fdf5f5';

const getId = ($, tds) => $(tds.get(1)).find('a').text().trim();
const getCountries = ($, tds) => $(tds.get(0)).text().trim();
const getType = ($, tds) => $(tds.get(3)).text().trim();
const getUtcOffset = ($, tds) => offsetStrToMin($(tds.get(4)).find('a').text().trim());
const getDstOffset = ($, tds) => offsetStrToMin($(tds.get(5)).find('a').text().trim());
const getAliasOf = ($, tds) => $(tds.get(7)).find('a').first().text().trim();
const getIsDeprecated = ($, row) => $(row).attr('style').includes(DEPRECATED_COLOR);

function parseData(html) {
  const $ = cheerio.load(html);
  const timezones = {};

  $(TABLE_SELECTOR).first().find(ROW_SELECTOR).map((i, row) => {
    const tds = $(row).find(VALUES_SELECTOR);
    if (!tds.length) return;

    const id = getId($, tds);
    const timezone = getTimezone($, tds);
    const deprecated = getIsDeprecated($, row);

    if (deprecated) timezone.r = 1;
    if (timezone) timezones[id] = timezone;
  });

  return sortObject(removeDuplicatedCountries(timezones));
}

function sortObject(timezones) {
  const sortedIds = Object.keys(timezones).sort();
  return sortedIds.reduce((result, id) => {
    return Object.assign(result, { [id]: timezones[id] });
  }, {});
}

function getTimezone($, tds) {
  const type = parseType(getType($, tds));
  const countries = parseCountries(getCountries($, tds));

  if (type === CANONICAL_TYPE) {
    const utcOffset = getUtcOffset($, tds);
    const dstOffset = getDstOffset($, tds);
    const tz = {
      u: utcOffset
    };
    if (utcOffset !== dstOffset) tz.d = dstOffset;
    if (countries.length) tz.c = countries;
    return tz;
  };

  if (type === ALIAS_TYPE) {
    const aliasOf = getAliasOf($, tds);
    const tz = { a: aliasOf };
    if (countries.length) tz.c = countries;
    return tz;
  };
}

function offsetStrToMin(offsetStr) {
  const [hoursStrRaw, minStr] = offsetStr.split(':');
  const hoursStr = hoursStrRaw
    .replace('−0', '-')
    .replace('−', '-')
    .replace('+0', '')
    .replace('+', '');

  const hours = parseInt(hoursStr, 10);
  const min = parseInt(minStr, 10);

  return hours * 60 + min;
}

function parseType(input) {
  if (input.includes(CANONICAL_TYPE)) return CANONICAL_TYPE;
  if (input.includes(ALIAS_TYPE)) return ALIAS_TYPE;
  return null
}

function parseCountries(input) {
  return (input || '')
    .replace(/[^A-Z,]/g, '')
    .split(',')
    .filter(e => !!e);
}

module.exports = parseData;
