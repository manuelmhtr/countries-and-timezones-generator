import getData from './get-data';
import parseData from './parse-data';
import type { CountriesAndTimezones } from "../types";

async function getTimezonesData(): Promise<CountriesAndTimezones["timezones"]> {
  const data = await getData();
  return parseData(data);
}

export default getTimezonesData;
