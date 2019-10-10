const fs = require('fs');
const FILE_PATH = '/tmp/countries-and-timezones.json';

function generateFile(data) {
  const title = '// u: uctOffer, d: dstOffset, c: country, a: aliasOf';
  const content = `${title}\n${JSON.stringify(data)}`;
  return fs.writeFileSync(FILE_PATH, content);
}

module.exports = generateFile;
