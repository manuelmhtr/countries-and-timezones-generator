const fs = require('fs');
const path = require('path');

const requireFile = (relPath) => fs.readFileSync(path.join(__dirname, relPath), 'utf8');

module.exports = {
  expectedCountries: require('./expected-countries'),
  expectedTimezones: require('./expected-timezones.json'),
  expectedTimezonesCountry: require('./expected-timezones-country.json'),
  moment: require('./moment.json'),
  timezoneByCountry: requireFile('./timezone-by-country.tab')
};
