const {difference, isInteger} = require('lodash');

const validateData = (data) => {
  checkAllCountriesHaveTimezones(data);
  checkUtcOffsets(data);
  checkAllAliasesExist(data);
  checkAllCountriesAreValid(data);
};

const format = (data) => JSON.stringify(data, null, 2);

const isAlias = (timezone) => Boolean(timezone.a);

const isCanonical = (timezone) => !isAlias(timezone) && Boolean(timezone.c);

const checkAllCountriesHaveTimezones = ({countries, timezones}) => {
  const withTz = Object.values(timezones).reduce((previous, tz) => {
    for (const c of tz.c || []) {
      previous[c] = true;
    }

    return previous;
  }, {});

  const diff = difference(Object.keys(countries), Object.keys(withTz));
  if (diff.length > 0)
    throw new Error(
      `There are ${diff.length} countries with no timezone: ${diff}`,
    );
};

const checkUtcOffsets = ({timezones}) => {
  const errors = Object.keys(timezones)
    .filter((k) => isCanonical(timezones[k]))
    .filter((k) => !isInteger(timezones[k].u));

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} timezones without UTC offset: ${format(errors)}`,
    );
};

const checkAllAliasesExist = ({timezones}) => {
  const errors = Object.keys(timezones)
    .filter((k) => isAlias(timezones[k]))
    .filter((k) => !timezones[timezones[k].a]);

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} timezones with no alias: ${format(errors)}`,
    );
};

const checkAllCountriesAreValid = ({countries, timezones}) => {
  const errors = Object.keys(timezones)
    .reduce((previous, t) => [...previous, ...(t.countries || [])], [])
    .filter((c) => !countries[c]);

  if (errors.length > 0)
    throw new Error(
      `There are ${errors.length} invalid countries: ${format(errors)}`,
    );
};

module.exports = validateData;
