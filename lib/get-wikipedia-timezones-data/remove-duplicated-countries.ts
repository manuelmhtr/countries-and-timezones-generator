import type {Country, CountryCode, Timezone} from 'countries-and-timezones';
import type {CompressedTimezone} from '../types';

const sameCountries = (c1: CountryCode[], c2: CountryCode[]) =>
  c1.join(',') === c2.join(',');

// Removes "c" property from aliases where canonical has the same info.
const removeDuplicatedCountries = (
  timezones: Record<Timezone['name'], CompressedTimezone>,
): Record<Timezone['name'], CompressedTimezone> =>
  Object.keys(timezones).reduce<Record<Timezone['name'], CompressedTimezone>>(
    (previous, key) => {
      const tz = timezones[key];
      if ('a' in tz && tz.a && tz.c) {
        const canonical = timezones[tz.a];
        if (sameCountries(tz.c, canonical.c!)) {
          delete tz.c;
        }
      }

      previous[key] = tz;
      return previous;
    },
    {},
  );

export default removeDuplicatedCountries;
