const parseData = require('../../../lib/get-timezones-data/parse-data');

describe('.getTimezonesData | .parseData', () => {
  const { moment, expectedTimezonesCountry, expectedTimezones } = TestUtils.data;
  const results = parseData(moment, expectedTimezonesCountry);

  it('returns an object', () => {
    expect(results).to.be.an('object');

    const actualLength = Object.keys(results).length;
    const expectedLength = Object.keys(expectedTimezones).length;
    expect(actualLength > 0).to.be.equal(true);
    expect(actualLength).to.be.equal(expectedLength);
  });

  Object.keys(expectedTimezones).forEach(id => {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.deep.equal(expectedTimezones[id]);
    });
  });

  Object.keys(results).forEach(id => {
    it(`should expect timezone "${id}"`, () => {
      expect(expectedTimezones[id]).to.be.an('object');
    });
  });
});
