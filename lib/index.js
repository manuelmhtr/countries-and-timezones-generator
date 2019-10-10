const getTimezonesData = require('./get-timezones-data');
const getCountriesData = require('./get-countries-data');
const generateFile = require('./generate-file');

async function generateCountriesAndTimezonesFile() {
  const timezones = await getTimezonesData();
  const countries = await getCountriesData();
  const data = {countries, timezones};
  generateFile(data);
}

return generateCountriesAndTimezonesFile()
  .then(() => console.log('DONE'))
  .catch(error => console.log('ERROR', error));
