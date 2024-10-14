const fs = require('node:fs');
const path = require('node:path');

const requireFile = (relativePath) =>
  fs.readFileSync(path.join(__dirname, relativePath), 'utf8');

module.exports = {
  expectedCountries: require('./expected-countries'),
  expectedTimezones: require('./expected-timezones.json'),
  expectedTimezonesCountry: require('./expected-timezones-country.json'),
  moment: require('./moment.json'),
  timezoneByCountry: requireFile('./timezone-by-country.tab'),
};
