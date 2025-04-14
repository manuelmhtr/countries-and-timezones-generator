import fixData from './fix-data/index.js';
import validateData from './validate-data/index.js';
import getCountriesData from './get-countries-data/index.js';
import getWikipediaTimezonesData from './get-wikipedia-timezones-data/index.js';
import {storeData} from './utils/index.js';

const FILE_PATH = '/tmp/countries-and-timezones.json';

async function generateFile(): Promise<void> {
  const countries = await getCountriesData();
  const timezones = await getWikipediaTimezonesData();
  const data = fixData({countries, timezones});
  validateData(data);
  storeData(FILE_PATH, data);
}

try {
  await generateFile();
  console.log(`DONE. File: ${FILE_PATH}`);
} catch (error) {
  console.log('ERROR', error);
}
