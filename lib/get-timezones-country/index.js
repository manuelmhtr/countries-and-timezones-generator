const fetchData = require('./fetch-data');
const parseData = require('./parse-data');

module.exports = async (validCountries) => {
  const data = await fetchData();
  return parseData(data, validCountries);
};
