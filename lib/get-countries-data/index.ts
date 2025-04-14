import getData from './get-data';
import parseData from './parse-data';
import type { CountriesAndTimezones } from "../types";

async function getCountriesData(): Promise<CountriesAndTimezones["countries"]> {
  const data = await getData();
  return parseData(data);
}

export default getCountriesData;
