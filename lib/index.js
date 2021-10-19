const fixData = require('./fix-data');
const validateData = require('./validate-data');
const getCountriesData = require('./get-countries-data');
const getDeprecatedTimezones = require('./get-deprecated-timezones');
const getWikipediaTimezonesData = require('./get-wikipedia-timezones-data');
const getTimezonesCountry = require('./get-timezones-country');
const getTimezonesData = require('./get-timezones-data');
const { storeData } = require('./utils');

const FILE_PATH = '/tmp/countries-and-timezones.json';

async function generateFile() {
  const countries = await getCountriesData();
  const timezones = await getWikipediaTimezonesData();
  const data = fixData({ countries, timezones });
  validateData(data);
  storeData(FILE_PATH, data);
}

return generateFile()
  .then(() => console.log(`DONE. File: ${FILE_PATH}`))
  .catch(error => console.log('ERROR', error));
