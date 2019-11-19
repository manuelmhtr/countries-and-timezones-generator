const fs = require('fs');
const path = require('path');
const expectedCountries = require('./expected-countries');
const parseData = require('../../../../lib/get-countries-data/parse-data');

describe('.getCountriesData | .parseData', () => {
  let results = {};

  before(() => {
    const dataPath = path.join(__dirname, './data.html')
    const dataHtml = fs.readFileSync(dataPath, 'utf8');
    results = parseData(dataHtml);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');
    expect(Object.keys(results).length).to.be.equal(249);
  });

  Object.keys(expectedCountries).forEach(id => {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedCountries[id]);
    });
  });
});
