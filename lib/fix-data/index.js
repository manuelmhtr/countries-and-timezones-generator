const { uniq } = require('lodash');
const {
  OVERWRITE_TIMEZONE,
  ADD_COUNTRIES,
  DEPRECATED_TIMEZONES,
} = require('./fixes');

const fixData = (data) => {
  return [
    removeDeprecatedTimezones,
    overwriteTimezones,
    addCountries,
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

const removeDeprecatedTimezones = (data) => {
  const timezones = Object.keys(data.timezones).reduce((prev, tz) => {
    if (!DEPRECATED_TIMEZONES.includes(tz)) prev[tz] = data.timezones[tz];
    return prev;
  }, {});
  return { ...data, timezones };
};

module.exports = fixData;
