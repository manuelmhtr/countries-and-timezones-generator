const parseData = require('../../../lib/get-timezones-country/parse-data');

describe('.getTimezonesCountry | .parseData', () => {
  const { timezoneByCountry, expectedTimezonesCountry, expectedCountries } = TestUtils.data;
  let results = {};

  before(() => {
    results = parseData(timezoneByCountry, expectedCountries);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');

    const actualLength = Object.keys(results).length;
    const expectedLength = Object.keys(expectedTimezonesCountry).length;
    expect(actualLength > 0).to.be.equal(true);
    expect(actualLength).to.be.equal(expectedLength);
  });

  Object.keys(expectedTimezonesCountry).forEach(id => {
    it(`parses "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedTimezonesCountry[id]);
    });
  });
});
