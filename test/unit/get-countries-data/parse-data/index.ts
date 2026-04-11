import fs from 'node:fs';
import path from 'node:path';
import {
	describe, beforeAll, it, expect,
} from 'vitest';
import {type Country} from 'countries-and-timezones';
import parseData from '../../../../lib/get-countries-data/parse-data';
import {type TestGlobal} from '../../../types';
import {type CountriesData} from '../../../../lib/types';

describe('.getCountriesData | .parseData', () => {
	const {expectedCountries} = (globalThis as TestGlobal).TestUtils.data;
	let results: Partial<CountriesData> = {};

	beforeAll(() => {
		const dataPath = path.join(import.meta.dirname, './data.html');
		const dataHtml = fs.readFileSync(dataPath, 'utf8');
		results = parseData(dataHtml);
	});

	it('should return an object', () => {
		expect(results).to.be.an('object');
		expect(Object.keys(results).length).to.be.equal(249);
	});

	for (const id of Object.keys(expectedCountries) as Array<Country['id']>) {
		it(`should parse "${id}" correctly`, () => {
			expect(results[id]).to.be.eql(expectedCountries[id]);
		});
	}
});
