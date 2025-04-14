import type {CountriesData} from '../types';
import getData from './get-data';
import parseData from './parse-data';

async function getCountriesData(): Promise<CountriesData> {
  const data = await getData();
  return parseData(data);
}

export default getCountriesData;
