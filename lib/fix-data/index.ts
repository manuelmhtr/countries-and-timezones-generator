import {uniq, omit} from 'lodash-es';
import {
  ADD_COUNTRIES,
  REMOVE_COUNTRIES,
  DEPRECATED_TIMEZONES,
  OVERWRITE_TIMEZONE,
} from './fixes';
import type { CountriesAndTimezones } from "../types";
import type { Country, TimezoneName } from "countries-and-timezones";

const fixData = (data: CountriesAndTimezones): CountriesAndTimezones => {
  return [
    addDeprecatedTimezones,
    overwriteTimezones,
    addCountries,
    removeCountries,
  ].reduce((previous, function_) => function_(previous), data);
};

const overwriteTimezones = (data: CountriesAndTimezones): CountriesAndTimezones => {
  for (const key of Object.keys(OVERWRITE_TIMEZONE) as TimezoneName[]) {
    const current = data.timezones[key];
    const replacement = OVERWRITE_TIMEZONE[key];
    data.timezones[key] = OVERWRITE_TIMEZONE[key];
    console.log(`\n\n${key}:`);
    console.log(JSON.stringify({current, replacement}, null, 2));
  }

  return data;
};

const addCountries = (data: CountriesAndTimezones): CountriesAndTimezones => {
  for (const key of Object.keys(ADD_COUNTRIES) as TimezoneName[]) {
    const tz = data.timezones[key];
    const newCountries = ADD_COUNTRIES[key];
    tz.c = uniq([...tz.c!, ...newCountries]);
    data.timezones[key] = tz;
  }

  return data;
};

const removeCountries = (data: CountriesAndTimezones): CountriesAndTimezones => ({
  ...data,
  countries: omit(data.countries, REMOVE_COUNTRIES) as CountriesAndTimezones["countries"],
});

const addDeprecatedTimezones = (data: CountriesAndTimezones): CountriesAndTimezones => {
  const timezones = (Object.keys(data.timezones) as TimezoneName[]).reduce((previous, tz) => {
    const timezone = data.timezones[tz];
    if (DEPRECATED_TIMEZONES.includes(tz)) timezone.r = 1;
    previous[tz] = timezone;
    return previous;
  }, {} as CountriesAndTimezones["timezones"]);
  return {...data, timezones};
};

export default fixData;
