const fs = require('node:fs');

function storeData(filePath, data) {
  const content = JSON.stringify(data);
  return fs.writeFileSync(filePath, content);
}

module.exports = storeData;
