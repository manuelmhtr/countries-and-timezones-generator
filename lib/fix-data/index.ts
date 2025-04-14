import {uniq, omit} from 'lodash-es';
import type {TimezoneName} from 'countries-and-timezones';
import type {
  CountriesAndTimezonesData,
  CountriesData,
  TimezonesData,
} from '../types';
import {
  ADD_COUNTRIES,
  REMOVE_COUNTRIES,
  DEPRECATED_TIMEZONES,
  OVERWRITE_TIMEZONE,
} from './fixes';

const fixData = (data: CountriesAndTimezonesData): CountriesAndTimezonesData =>
  [
    addDeprecatedTimezones,
    overwriteTimezones,
    addCountries,
    removeCountries,
  ].reduce((previous, function_) => function_(previous), data);

const overwriteTimezones = (
  data: CountriesAndTimezonesData,
): CountriesAndTimezonesData => {
  for (const key of Object.keys(OVERWRITE_TIMEZONE) as TimezoneName[]) {
    const current = data.timezones[key];
    const replacement = OVERWRITE_TIMEZONE[key];
    data.timezones[key] = OVERWRITE_TIMEZONE[key]!;
    console.log(`\n\n${key}:`);
    console.log(JSON.stringify({current, replacement}, null, 2));
  }

  return data;
};

const addCountries = (
  data: CountriesAndTimezonesData,
): CountriesAndTimezonesData => {
  for (const key of Object.keys(ADD_COUNTRIES) as TimezoneName[]) {
    const tz = data.timezones[key];
    const newCountries = ADD_COUNTRIES[key]!;
    tz.c = uniq([...tz.c!, ...newCountries]);
    data.timezones[key] = tz;
  }

  return data;
};

const removeCountries = (
  data: CountriesAndTimezonesData,
): CountriesAndTimezonesData => ({
  ...data,
  countries: omit(data.countries, REMOVE_COUNTRIES) as CountriesData,
});

const addDeprecatedTimezones = (
  data: CountriesAndTimezonesData,
): CountriesAndTimezonesData => {
  const timezones = (
    Object.keys(data.timezones) as TimezoneName[]
  ).reduce<TimezonesData>((previous, tz) => {
    const timezone = data.timezones[tz];
    if (DEPRECATED_TIMEZONES.includes(tz)) {
      timezone.r = 1;
    }

    previous[tz] = timezone;
    return previous;
  }, {});
  return {...data, timezones};
};

export default fixData;
