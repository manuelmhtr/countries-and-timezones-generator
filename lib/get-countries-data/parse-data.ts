import {type CheerioAPI, load} from 'cheerio';
import {type Country, type Timezone} from 'countries-and-timezones';
import type {CountriesData, ExternalCountryCode} from '../types';

const TABLE_SELECTOR = 'table.wikitable.sortable';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';
const OVERWRITE_NAMES: Record<ExternalCountryCode, Timezone['name']> = {
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

const getId = (
  $: CheerioAPI,
  tds: ReturnType<ReturnType<CheerioAPI>['find']>,
): Country['id'] => $(tds.get(0)).text().trim() as Country['id'];
const getName = (
  $: CheerioAPI,
  tds: ReturnType<ReturnType<CheerioAPI>['find']>,
): Country['name'] => $(tds.get(1)).find('a').text();

function parseData(html: string): CountriesData {
  const $ = load(html);
  const countries: Partial<Record<Country['id'], Timezone['name']>> = {};

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

  const sortedIds = Object.keys(countries).sort() as Array<Country['id']>;
  return Object.fromEntries(
    sortedIds.map((id) => [id, countries[id]]),
  ) as CountriesData;
}

function parseName(id: Country['id'], input: string): Country['name'] {
  const name = OVERWRITE_NAMES[id];
  return name || removeNameNotes(input);
}

function removeNameNotes(input: string): string {
  return input
    .replaceAll(/\(.+\)/g, '')
    .replaceAll(/\[.+]/g, '')
    .replaceAll(/\s\s+/g, ' ')
    .replace(/,.+/, '')
    .trim();
}

export default parseData;
