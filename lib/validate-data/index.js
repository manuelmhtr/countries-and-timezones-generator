const { difference, isInteger } = require('lodash');

const validateData = (data) => {
  checkAllCountriesHaveTimezones(data);
  checkUtcOffsets(data);
  checkAllAliasesExist(data);
};

const format = (data) => JSON.stringify(data, null, 2);

const isAlias = (timezone) => !!timezone.a;

const isCanonical = (timezone) => !isAlias(timezone) && !!timezone.c;

const checkAllCountriesHaveTimezones = ({ countries, timezones }) => {
  const withTz = Object.values(timezones).reduce((prev, tz) => {
    (tz.c || []).forEach((c) => { prev[c] = true; });
    return prev;
  }, {});

  const diff = difference(Object.keys(countries), Object.keys(withTz));
  if (diff.length) throw new Error(`There are ${diff.length} countries with no timezone: ${diff}`);
};

const checkUtcOffsets = ({ timezones }) => {
  const errors = Object.keys(timezones)
    .filter((k) => isCanonical(timezones[k]))
    .filter((k) => !isInteger(timezones[k].u));

  if (errors.length) throw new Error(`There are ${errors.length} timezones without UTC offset: ${format(errors)}`);
};

const checkAllAliasesExist = ({ timezones }) => {
  const errors = Object.keys(timezones)
    .filter((k) => isAlias(timezones[k]))
    .filter((k) => !timezones[timezones[k].a]);

  if (errors.length) throw new Error(`There are ${errors.length} timezones with no alias: ${format(errors)}`);
};

module.exports = validateData;
