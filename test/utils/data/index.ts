import fs from 'node:fs';
import path from 'node:path';
import expectedCountries from './expected-countries';
import expectedTimezones from './expected-timezones.json' with {type: 'json'};
import expectedTimezonesCountry from './expected-timezones-country.json' with {type: 'json'};
import moment from './moment.json' with {type: 'json'};

const dataPath = path.resolve(import.meta.dirname, './timezone-by-country.tab');
const timezoneByCountry = fs.readFileSync(dataPath, 'utf8');

const exported = {
  expectedCountries,
  expectedTimezones,
  expectedTimezonesCountry,
  moment,
  timezoneByCountry,
};

export default exported;
