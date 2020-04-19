const getCountriesData = require('./get-countries-data');
const getTimezonesCountry = require('./get-timezones-country');
const getTimezonesData = require('./get-timezones-data');
const { storeData } = require('./utils');

const FILE_PATH = '/tmp/countries-and-timezones.json';

async function generateFile() {
  const countries = await getCountriesData();
  const timezonesCountry = await getTimezonesCountry(countries);
  const timezones = await getTimezonesData(timezonesCountry);
  const data = { countries, timezones };
  storeData(FILE_PATH, data);
}

return generateFile()
  .then(() => console.log(`DONE. File: ${FILE_PATH}`))
  .catch(error => console.log('ERROR', error));
