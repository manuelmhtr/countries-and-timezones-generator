import fs from 'node:fs';
import path from 'node:path';
import parseData from '../../../../lib/get-wikipedia-timezones-data/parse-data';
import expectedTimezones from './expected-timezones';
import { describe, beforeAll, it, expect} from "vitest";
import { TimezonesData } from "../../../../lib/types";

describe('.getTimezonesData | .parseData', () => {
  let results = {} as TimezonesData;

  beforeAll(() => {
    const dataPath = path.join(import.meta.dirname, './data.html');
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
