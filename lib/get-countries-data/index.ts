import getData from './get-data';
import parseData from './parse-data';
import type { CountriesData } from "../types";

async function getCountriesData(): Promise<CountriesData> {
  const data = await getData();
  return parseData(data);
}

export default getCountriesData;
