import getData from './get-data.js';
import parseData from './parse-data.js';
import type { CountriesAndTimezones } from "../types/index.js";

async function getTimezonesData(): Promise<CountriesAndTimezones["timezones"]> {
  const data = await getData();
  return parseData(data);
}

export default getTimezonesData;
