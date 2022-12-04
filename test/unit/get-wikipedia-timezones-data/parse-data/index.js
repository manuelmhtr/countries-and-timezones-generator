const fs = require('fs');
const path = require('path');
const expectedTimezones = require('./expected-timezones');
const parseData = require('../../../../lib/get-wikipedia-timezones-data/parse-data');

describe('.getTimezonesData | .parseData', () => {
  let results = {};

  before(() => {
    const dataPath = path.join(__dirname, './data.html')
    const dataHtml = fs.readFileSync(dataPath, 'utf8');
    results = parseData(dataHtml);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');
    expect(Object.keys(results).length).to.be.equal(Object.keys(expectedTimezones).length);
  });

  Object.keys(expectedTimezones).forEach(id => {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedTimezones[id]);
    });
  });
});
