import type { Country, Timezone } from "countries-and-timezones";
import type { CompressedTimezone } from "../types";

const sameCountries = (c1: Country["name"][], c2: Country["name"][]) => c1.join(',') === c2.join(',');

// Removes "c" property from aliases where canonical has the same info.
const removeDuplicatedCountries = (timezones: Record<Timezone["name"], CompressedTimezone>): Record<Timezone["name"], CompressedTimezone> => {
  return Object.keys(timezones).reduce((previous, key) => {
    const tz = timezones[key];
    if (tz.a && tz.c) {
      const canonical = timezones[tz.a];
      if (sameCountries(tz.c, canonical.c!)) delete tz.c;
    }

    previous[key] = tz;
    return previous;
  }, {} as Record<Timezone["name"], CompressedTimezone>);
};

export default removeDuplicatedCountries;
