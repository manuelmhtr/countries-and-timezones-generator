import getData from './get-data.js';
import parseData from './parse-data.js';
import type { CountriesAndTimezones } from "../types/index.js";

async function getCountriesData(): Promise<CountriesAndTimezones["countries"]> {
  const data = await getData();
  return parseData(data);
}

export default getCountriesData;
