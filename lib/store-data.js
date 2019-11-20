const fs = require('fs');
const FILE_PATH = '/tmp/countries-and-timezones.json';

function storeData(data) {
  const content = JSON.stringify(data);
  return fs.writeFileSync(FILE_PATH, content);
}

module.exports = storeData;
