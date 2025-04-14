import fs from 'node:fs';
import path from 'node:path';
import parseData from '../../../../lib/get-countries-data/parse-data.js';
import { describe, beforeAll, it, expect} from "vitest";
import { TestGlobal } from "../../../types/index.js";
import { CountriesAndTimezones } from "../../../../lib/types/index.js";
import { Country } from "countries-and-timezones";

describe('.getCountriesData | .parseData', () => {
  let { expectedCountries }= (global as TestGlobal).TestUtils.data;
  let results = {} as CountriesAndTimezones["countries"];

  beforeAll(() => {
    const dataPath = path.join(import.meta.dirname, './data.html');
    const dataHtml = fs.readFileSync(dataPath, 'utf8');
    results = parseData(dataHtml);
  });

  it('should return an object', () => {
    expect(results).to.be.an('object');
    expect(Object.keys(results).length).to.be.equal(249);
  });

  for (const id of (Object.keys(expectedCountries) as Country["id"][])) {
    it(`should parse "${id}" correctly`, () => {
      expect(results[id]).to.be.eql(expectedCountries[id]);
    });
  }
});
