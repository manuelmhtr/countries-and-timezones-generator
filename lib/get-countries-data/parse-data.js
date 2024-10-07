const cheerio = require('cheerio');

const TABLE_SELECTOR = 'table.wikitable.sortable';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';
const OVERWRITE_NAMES = {
  BN: 'Brunei',
  BQ: 'Caribbean Netherlands',
  CI: 'Ivory Coast',
  CD: 'Democratic Republic of the Congo',
  CG: 'Republic of the Congo',
  GB: 'United Kingdom',
  KP: 'North Korea',
  KR: 'South Korea',
  LA: 'Laos',
  RU: 'Russia',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  SY: 'Syria',
  VG: 'Virgin Islands (UK)',
  VI: 'Virgin Islands (US)',
  VN: 'Vietnam',
};

const getId = ($, tds) => $(tds.get(0)).text().trim();
const getName = ($, tds) => $(tds.get(1)).find('a').text();

function parseData(html) {
  const $ = cheerio.load(html);
  const countries = {};

  $(TABLE_SELECTOR)
    .first()
    /* eslint-disable-next-line unicorn/no-array-callback-reference -- cheerio's `find` allows a string as a param */
    .find(ROW_SELECTOR)
    .each((index, row) => {
      const tds = $(row).find(VALUES_SELECTOR);
      if (tds.length === 0) {
        return;
      }

      const id = getId($, tds);
      const name = parseName(id, getName($, tds));

      countries[id] = name;
    });

  const sortedIds = Object.keys(countries).sort();
  return sortedIds.reduce((result, id) => {
    return Object.assign(result, {[id]: countries[id]});
  }, {});
}

function parseName(id, input) {
  const name = OVERWRITE_NAMES[id];
  return name || removeNameNotes(input);
}

function removeNameNotes(input) {
  return input
    .replaceAll(/\(.+\)/g, '')
    .replaceAll(/\[.+]/g, '')
    .replaceAll(/\s\s+/g, ' ')
    .replace(/,.+/, '')
    .trim();
}

module.exports = parseData;
