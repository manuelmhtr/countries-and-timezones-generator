import {difference, isInteger} from 'lodash-es';
import type { Country, Timezone } from "countries-and-timezones";
import { CompressedTimezone, CountriesAndTimezones } from "../types/index.js";
import { SetRequired } from "type-fest";

const validateData = (data: CountriesAndTimezones): void => {
  checkAllCountriesHaveTimezones(data);
  checkUtcOffsets(data);
  checkAllAliasesExist(data);
  checkAllCountriesAreValid(data);
};

const format = (data: object) => JSON.stringify(data, null, 2);

const isAlias = (timezone: CompressedTimezone) => Boolean(timezone.a);

const isCanonical = (timezone: CompressedTimezone) => !isAlias(timezone) && Boolean(timezone.c);

const checkAllCountriesHaveTimezones = ({countries, timezones}: CountriesAndTimezones): void => {
  const withTz = Object.values(timezones).reduce((previous, tz) => {
    for (const c of tz.c || []) {
      previous[c] = true;
    }

    return previous;
  }, {} as Record<SetRequired<CompressedTimezone, "c">["c"][number], boolean>);

  const diff = difference(Object.keys(countries), Object.keys(withTz));
  if (diff.length > 0)
    throw new Error(
      `There are ${diff.length} countries with no timezone: ${diff}`,
    );
};

const checkUtcOffsets = ({timezones}: CountriesAndTimezones) => {
  const errors = Object.keys(timezones)
    .filter((k) => isCanonical(timezones[k]))
    .filter((k) => !isInteger(timezones[k].u));

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} timezones without UTC offset: ${format(errors)}`,
    );
};

const checkAllAliasesExist = ({timezones}: CountriesAndTimezones) => {
  const errors = Object.keys(timezones)
    .filter((k) => isAlias(timezones[k]))
    .filter((k) => !timezones[timezones[k].a]);

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} timezones with no alias: ${format(errors)}`,
    );
};

const checkAllCountriesAreValid = ({countries, timezones}: CountriesAndTimezones): void => {
  const errors = (Object.keys(timezones) as Timezone["name"][])
    .reduce((previous, t) => [
      ...previous,
      // @ts-expect-error -- `t.countries` might be a bug as `t` is a key from `timezones`
      ...(t.countries as Country["id"][] || [])
    ], [] as Country["id"][])
    .filter((c) => !countries[c]);

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} invalid countries: ${format(errors)}`,
    );
};

export default validateData;
