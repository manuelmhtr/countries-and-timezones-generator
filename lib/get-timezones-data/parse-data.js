const cheerio = require('cheerio');

const CANONICAL_TYPE = 'Canonical';
const ALIAS_TYPE = 'Alias';
const TABLE_SELECTOR = 'table.wikitable tbody';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';

const getId = ($, tds) => $(tds.get(2)).find('a').text().trim();
const getCountry = ($, tds) => $(tds.get(0)).find('a').text().trim() || null;
const getType = ($, tds) => $(tds.get(4)).text().trim();
const getUtcOffset = ($, tds) => offsetStrToMin($(tds.get(5)).find('a').text().trim());
const getDstOffset = ($, tds) => offsetStrToMin($(tds.get(6)).find('a').text().trim());
const getAliasOf = ($, tds) => $(tds.get(7)).find('a').first().text().trim();

function parseData(html) {
  const $ = cheerio.load(html);
  const timezones = {};

  $(TABLE_SELECTOR).first().find(ROW_SELECTOR).map((i, row) => {
      const tds = $(row).find(VALUES_SELECTOR);
      if (!tds.length) return;

      const id = getId($, tds);
      const timezone = getTimezone($, tds);

      if (timezone) timezones[id] = timezone;
    });

  const sortedIds = Object.keys(timezones).sort();
  return sortedIds.reduce((result, id) => {
    return Object.assign(result, { [id]: timezones[id] });
  }, {});
}

function getTimezone($, tds) {
  const type = getType($, tds);

  if (type === CANONICAL_TYPE) {
    const country = getCountry($, tds);
    const utcOffset = getUtcOffset($, tds);
    const dstOffset = getDstOffset($, tds);
    const tz = {
      u: utcOffset
    };
    if (utcOffset !== dstOffset) tz.d = dstOffset;
    if (country) tz.c = country;
    return tz;
  };

  if (type === ALIAS_TYPE) {
    const country = getCountry($, tds);
    const aliasOf = getAliasOf($, tds);
    const tz = { a: aliasOf };
    if (country) tz.c = country;
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

module.exports = parseData;
