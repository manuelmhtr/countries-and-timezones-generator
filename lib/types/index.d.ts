import type {
	Country,
	CountryCode,
	Timezone,
	TimezoneName,
} from 'countries-and-timezones';

export type CountriesAndTimezonesData = {
	countries: CountriesData;
	timezones: TimezonesData;
};

export type CountriesData = Record<Country['id'], Country['name']>;
export type TimezonesData = Record<Timezone['name'], CompressedTimezone>;

export type CompressedTimezone = CanonicalTimezone | AliasTimezone;

type BaseTimezone = {
	/**
   * Countries (country code)
   */
	c?: CountryCode[];

	/**
   * Deprecated
   */
	r?: number;
};

export type AliasTimezone = BaseTimezone & {
	/**
   * Alias
   */
	a: string;
};

export type CanonicalTimezone = BaseTimezone & {
	/**
   * Utc offset
   */
	u: number;

	/**
   * Dst offset
   */
	d?: number;
};

type ExternalCountryCode = string;

export type Fixes = {
	ADD_COUNTRIES: Partial<Record<TimezoneName, ExternalCountryCode[]>>;
	REMOVE_COUNTRIES: ExternalCountryCode[];
	DEPRECATED_TIMEZONES: TimezoneName[];
	OVERWRITE_TIMEZONE: Partial<Record<TimezoneName, CompressedTimezone>>;
};
