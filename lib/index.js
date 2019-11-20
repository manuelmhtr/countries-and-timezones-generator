const getTimezonesData = require('./get-timezones-data');
const getCountriesData = require('./get-countries-data');
const storeData = require('./store-data');

async function generateFile() {
  const timezones = await getTimezonesData();
  const countries = await getCountriesData();
  const data = {countries, timezones};
  storeData(data);
}

return generateFile()
  .then(() => console.log('DONE'))
  .catch(error => console.log('ERROR', error));
