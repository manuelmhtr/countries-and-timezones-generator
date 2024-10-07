const fs = require('node:fs');
const path = require('node:path');
const parseData = require('../../../../lib/get-countries-data/parse-data');

describe('.getCountriesData | .parseData', () => {
  const {expectedCountries} = TestUtils.data;
  let results = {};

  before(() => {
    const dataPath = path.join(__dirname, './data.html');
    const dataHtml = fs.readFileSync(dataPath, 'utf8');
    results = parseData(dataHtml);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');
    expect(Object.keys(results).length).to.be.equal(249);
  });

  for (const id of Object.keys(expectedCountries)) {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedCountries[id]);
    });
  }
});
