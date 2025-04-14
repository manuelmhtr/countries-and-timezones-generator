import type { Country, CountryCode, Timezone, TimezoneName } from "countries-and-timezones";

export type CountriesAndTimezonesData = {
  countries: CountriesData;
  timezones: TimezonesData;
}

export type CountriesData = Record<Country["id"], Country["name"]>;
export type TimezonesData = Record<Timezone["name"], CompressedTimezone>;

export type CompressedTimezone = CanonicalTimezone | AliasTimezone;

type BaseTimezone = {
  /**
   * countries (country code)
   */
  c?: string[];

  /**
   * deprecated
   */
  r?: number
}

type AliasTimezone = BaseTimezone & {
  /**
   * alias
   */
  a: string;
}

type CanonicalTimezone = BaseTimezone & {
  /**
   * utc offset
   */
  u: number;

  /**
   * dst offset
   */
  d?: number;
}

type ExcludedCountryCode = string;

export type Fixes = {
  ADD_COUNTRIES: Partial<Record<TimezoneName, CountryCode>>;
  REMOVE_COUNTRIES: ExcludedCountryCode[];
  DEPRECATED_TIMEZONES: TimezoneName[];
  OVERWRITE_TIMEZONE: Partial<Record<TimezoneName, CompressedTimezone>>;
};

