import type { Country, CountryCode, Timezone, TimezoneName } from "countries-and-timezones";

export type CountriesAndTimezones = {
  countries: Record<Country["id"], Country["name"]>;
  timezones: Record<Timezone["name"], CompressedTimezone>;
}

export type CompressedTimezone = BaseTimezone & CanonicalTimezone & AliasTimezone & DeprecatedTimezone;

type BaseTimezone = {
  c?: string[];
}

type AliasTimezone = {
  a: string;
}

type CanonicalTimezone = {
  u: number;
  d: number;
}

type DeprecatedTimezone = {
  r: number
}

export type FixedCompressedTimezone = CompressedTimezone & { countries: Country["name"][] };

export type ExternalCountryCode = string;

export type Fixes = {
  ADD_COUNTRIES: Partial<Record<TimezoneName, CountryCode>>;
  REMOVE_COUNTRIES: ExternalCountryCode[];
  DEPRECATED_TIMEZONES: TimezoneName[];
  OVERWRITE_TIMEZONE: Partial<Record<TimezoneName, CompressedTimezone>>;
};

