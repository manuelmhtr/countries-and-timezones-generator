const fs = require('node:fs');
const path = require('node:path');
const parseData = require('../../../../lib/get-wikipedia-timezones-data/parse-data');
const expectedTimezones = require('./expected-timezones');

describe('.getTimezonesData | .parseData', () => {
  let results = {};

  before(() => {
    const dataPath = path.join(__dirname, './data.html');
    const dataHtml = fs.readFileSync(dataPath, 'utf8');
    results = parseData(dataHtml);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');
    expect(Object.keys(results).length).to.be.equal(
      Object.keys(expectedTimezones).length,
    );
  });

  for (const id of Object.keys(expectedTimezones)) {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedTimezones[id]);
    });
  }
});
