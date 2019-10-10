const cheerio = require('cheerio');

const TABLE_SELECTOR = 'table.wikitable.sortable';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';
const OVERWRITE_NAMES = {
  BN: 'Brunei',
  CI: 'Ivory Coast',
  GB: 'United Kingdom',
  KP: 'North Korea',
  KR: 'South Korea',
  LA: 'Laos',
  RU: 'Russia',
  SY: 'Syria',
  VG: 'Virgin Islands (UK)',
  VI: 'Virgin Islands (US)',
  VN: 'Vietnam'
};

const getId = ($, tds) => $(tds.get(0)).text().trim();
const getName = ($, tds) => $(tds.get(1)).find('a').text().trim();

function parseData(html) {
  const $ = cheerio.load(html);
  const countries = {};

  $(TABLE_SELECTOR).first().find(ROW_SELECTOR).map((i, row) => {
      const tds = $(row).find(VALUES_SELECTOR);
      if (!tds.length) return;

      const id = getId($, tds);
      const name = parseName(id, getName($, tds));

      countries[id] = name;
    });

  const sortedIds = Object.keys(countries).sort();
  return sortedIds.reduce((result, id) => {
    return Object.assign(result, { [id]: countries[id] });
  }, {});
}

function parseName(id, input) {
  const name = OVERWRITE_NAMES[id];
  return name || input
    .replace(/\(.+\)/, '')
    .replace(/,.+/, '');
  
}

module.exports = parseData;
