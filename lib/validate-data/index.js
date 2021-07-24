const { difference } = require('lodash');

const validateData = ({ countries, timezones }) => {
  checkAllCountriesHaveTimezones({ countries, timezones });
};

const checkAllCountriesHaveTimezones = ({ countries, timezones }) => {
  const withTz = Object.values(timezones).reduce((prev, tz) => {
    (tz.c || []).forEach((c) => { prev[c] = true; });
    return prev;
  }, {});

  const diff = difference(Object.keys(countries), Object.keys(withTz));
  if (diff.length) throw new Error(`There are ${diff.length} countries with no timezone: ${diff}`);
};

module.exports = validateData;
