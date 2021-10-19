const fetchData = require('./fetch-data');
const parseData = require('./parse-data');

module.exports = async (timezonesCountry, deprecated) => {
  const data = await fetchData();
  return parseData(data, timezonesCountry, deprecated);
};
