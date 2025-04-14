import {difference, isInteger} from 'lodash-es';
import type {Country, CountryCode, TimezoneName} from 'countries-and-timezones';
import {
  type AliasTimezone,
  type CanonicalTimezone,
  type CompressedTimezone,
  type CountriesAndTimezonesData,
} from '../types';

const validateData = (data: CountriesAndTimezonesData): void => {
  checkAllCountriesHaveTimezones(data);
  checkUtcOffsets(data);
  checkAllAliasesExist(data);
  checkAllCountriesAreValid(data);
};

const format = (data: CountryCode[] | TimezoneName[]) =>
  JSON.stringify(data, null, 2);

const isAlias = (timezone: CompressedTimezone): timezone is AliasTimezone =>
  'a' in timezone && Boolean(timezone.a);

const isCanonical = (
  timezone: CompressedTimezone,
): timezone is CanonicalTimezone => !isAlias(timezone) && Boolean(timezone.c);

const checkAllCountriesHaveTimezones = ({
  countries,
  timezones,
}: CountriesAndTimezonesData): void => {
  const withTz = Object.values(timezones).reduce<
    Partial<Record<CountryCode, boolean>>
  >((previous, tz) => {
    for (const c of tz.c ?? []) {
      previous[c] = true;
    }

    return previous;
  }, {});

  const diff = difference(Object.keys(countries), Object.keys(withTz));
  if (diff.length > 0) {
    throw new Error(
      `There are ${diff.length} countries with no timezone: ${diff}`,
    );
  }
};

const checkUtcOffsets = ({timezones}: CountriesAndTimezonesData) => {
  const errors = (Object.keys(timezones) as TimezoneName[])
    .filter((k) => isCanonical(timezones[k]))
    .filter((k) => !isInteger((timezones[k] as CanonicalTimezone).u));

  if (errors.length > 0) {
    throw new Error(
      `There are ${errors.length} timezones without UTC offset: ${format(errors)}`,
    );
  }
};

const checkAllAliasesExist = ({timezones}: CountriesAndTimezonesData) => {
  const errors = (Object.keys(timezones) as TimezoneName[])
    .filter((k) => isAlias(timezones[k]))
    .filter((k) => !timezones[(timezones[k] as AliasTimezone).a]);

  if (errors.length > 0) {
    throw new Error(
      `There are ${errors.length} timezones with no alias: ${format(errors)}`,
    );
  }
};

const checkAllCountriesAreValid = ({
  countries,
  timezones,
}: CountriesAndTimezonesData): void => {
  const errors = (Object.keys(timezones) as CountryCode[])
    .reduce<Array<Country['id']>>(
      (previous, t) => [
        ...previous,
        // @ts-expect-error -- `t.countries` might be a bug as `t` is a key from `timezones`
        ...((t.countries as Array<Country['id']>) || []),
      ],
      [],
    )
    .filter((c) => !countries[c]);

  if (errors.length > 0) {
    throw new Error(
      `There are ${errors.length} invalid countries: ${format(errors)}`,
    );
  }
};

export default validateData;
