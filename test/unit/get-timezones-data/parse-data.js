const fs = require('fs');
const path = require('path');
const parseData = require('../../../lib/get-timezones-data/parse-data');

describe('.getTimezonesData | .parseData', () => {
  const { moment, expectedTimezonesCountry, expectedTimezones } = TestUtils.data;
  const data = moment;
  let results = {};

  before(() => {
    results = parseData(data, expectedTimezonesCountry);
  });

  it('returns an object', () => {
    expect(results).to.be.an('object');
    console.log(results);

    const actualLength = Object.keys(results).length;
    const expectedLength = Object.keys(expectedTimezones).length;
    expect(actualLength > 0).to.be.equal(true);
    expect(actualLength).to.be.equal(expectedLength);
  });

  Object.keys(expectedTimezones).forEach(id => {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedTimezones[id]);
    });
  });
});
