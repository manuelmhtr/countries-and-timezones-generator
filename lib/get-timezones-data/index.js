const getData = require('./get-data');
const parseData = require('./parse-data');

async function getTimezonesData() {
  const data = await getData();
  return parseData(data);
}

module.exports = getTimezonesData;
