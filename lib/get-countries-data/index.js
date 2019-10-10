const getData = require('./get-data');
const parseData = require('./parse-data');

async function getCountriesData() {
  const data = await getData();
  return parseData(data);
}

module.exports = getCountriesData;
