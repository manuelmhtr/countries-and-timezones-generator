import { type CheerioAPI, load } from 'cheerio';
import removeDuplicatedCountries from './remove-duplicated-countries.js';
import type { CompressedTimezone, CountriesAndTimezones } from "../types/index.js";
import type { Timezone } from "countries-and-timezones";

const CANONICAL_TYPE = 'Canonical';
const ALIAS_TYPE = 'Link';
const TABLE_SELECTOR = 'table.wikitable tbody';
const ROW_SELECTOR = 'tr';
const VALUES_SELECTOR = 'td';
const DEPRECATED_COLOR = '#fdf5f5';

const getId = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) => $(tds.get(1)).find('a').text().trim();
const getCountries = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) => $(tds.get(0)).text().trim();
const getType = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) => $(tds.get(3)).text().trim();
const getUtcOffset = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) =>
  offsetStringToMin($(tds.get(4)).find('a').text().trim());
const getDstOffset = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) =>
  offsetStringToMin($(tds.get(5)).find('a').text().trim());
const getAliasOf = ($: CheerioAPI,  tds:ReturnType<ReturnType<CheerioAPI>["find"]>) =>
  $(tds.get(tds.length - 1))
    .find('a')
    .first()
    .text()
    .trim();
const getIsDeprecated = ($: CheerioAPI,  row:ReturnType<ReturnType<CheerioAPI>["find"]>) =>
  $(row).attr('style')!.includes(DEPRECATED_COLOR);

function parseData(html: string): CountriesAndTimezones["timezones"] {
  const $ = load(html);
  const timezones: Partial<Record<Timezone["name"], CompressedTimezone>> = {};

  $(TABLE_SELECTOR)
    .first()
    /* eslint-disable-next-line unicorn/no-array-callback-reference -- cheerio's `find` allows a string as a param */
    .find(ROW_SELECTOR)
    .each((index, row) => {
      const tds = $(row).find(VALUES_SELECTOR);
      if (tds.length === 0) return;

      const id = getId($, tds);
      const timezone = getTimezone($, tds);
      const deprecated = getIsDeprecated($, row as any as ReturnType<ReturnType<CheerioAPI>["find"]>);

      if (deprecated) timezone!.r = 1;
      if (timezone) timezones[id] = timezone;
    });

  return sortObject(removeDuplicatedCountries(timezones as Record<Timezone["name"], CompressedTimezone>));
}

function sortObject(timezones: Record<Timezone["name"], CompressedTimezone>): Record<Timezone["name"], CompressedTimezone> {
  const sortedIds = Object.keys(timezones).sort();
  return sortedIds.reduce((result, id) => {
    return Object.assign(result, { [id]: timezones[id] });
  }, {});
}

function getTimezone($: CheerioAPI, tds:ReturnType<ReturnType<CheerioAPI>["find"]>): CompressedTimezone | undefined {
  const type = parseType(getType($, tds));
  const countries = parseCountries(getCountries($, tds));

  if (type === CANONICAL_TYPE) {
    const utcOffset = getUtcOffset($, tds);
    const dstOffset = getDstOffset($, tds);
    const tz: Partial<CompressedTimezone> = {
      u: utcOffset,
    };
    if (utcOffset !== dstOffset) tz.d = dstOffset;
    if (countries.length > 0) tz.c = countries;
    return tz as CompressedTimezone;
  }

  if (type === ALIAS_TYPE) {
    const aliasOf = getAliasOf($, tds);
    const tz: Partial<CompressedTimezone> = { a: aliasOf };
    if (countries.length > 0) tz.c = countries;
    return tz as CompressedTimezone;
  }
}

function offsetStringToMin(offsetString: string): number {
  const [hoursStringRaw, minString] = offsetString.split(':');
  const hoursString = hoursStringRaw
    .replace('−0', '-')
    .replace('−', '-')
    .replace('+0', '')
    .replace('+', '');

  const hours = Number.parseInt(hoursString, 10);
  const min = Number.parseInt(minString, 10);
  const sign = hours > 0 ? 1 : -1;

  return hours * 60 + min * sign;
}

function parseType(input: string): null | string {
  if (input.includes(CANONICAL_TYPE)) return CANONICAL_TYPE;
  if (input.includes(ALIAS_TYPE)) return ALIAS_TYPE;
  return null;
}

function parseCountries(input: string): string[] {
  return (input || '')
    .replaceAll(/[^A-Z,]/g, '')
    .split(',')
    .filter(Boolean);
}

export default parseData;
