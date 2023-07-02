const { uniq, omit } = require('lodash');
const {
  ADD_COUNTRIES,
  REMOVE_COUNTRIES,
  DEPRECATED_TIMEZONES,
  OVERWRITE_TIMEZONE,
} = require('./fixes');

const fixData = (data) => {
  return [
    addDeprecatedTimezones,
    overwriteTimezones,
    addCountries,
    removeCountries,
  ].reduce((prev, fn) => fn(prev), data);
};

const overwriteTimezones = (data) => {
  Object.keys(OVERWRITE_TIMEZONE).forEach(key => {
    const current = data.timezones[key];
    const replacement = OVERWRITE_TIMEZONE[key];
    data.timezones[key] = OVERWRITE_TIMEZONE[key];
    console.log(`\n\n${key}:`);
    console.log(JSON.stringify({ current, replacement }, null, 2));
  });

  return data;
};

const addCountries = (data) => {
  Object.keys(ADD_COUNTRIES).forEach(key => {
    const tz = data.timezones[key];
    const newCountries = ADD_COUNTRIES[key];
    tz.c = uniq([...tz.c, ...newCountries]);
    data.timezones[key] = tz;
  });

  return data;
};

const removeCountries = (data) => ({
  ...data,
  countries: omit(data.countries, REMOVE_COUNTRIES),
});

const addDeprecatedTimezones = (data) => {
  const timezones = Object.keys(data.timezones).reduce((prev, tz) => {
    const timezone = data.timezones[tz];
    if (DEPRECATED_TIMEZONES.includes(tz)) timezone.r = 1
    prev[tz] = timezone
    return prev;
  }, {});
  return { ...data, timezones };
};

module.exports = fixData;
