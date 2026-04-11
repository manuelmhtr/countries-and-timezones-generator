import fixData from './fix-data';
import validateData from './validate-data';
import getCountriesData from './get-countries-data';
import getWikipediaTimezonesData from './get-wikipedia-timezones-data';
import {storeData} from './utils';

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
