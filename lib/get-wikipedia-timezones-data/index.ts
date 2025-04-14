import getData from './get-data';
import parseData from './parse-data';
import type { TimezonesData } from "../types";

async function getTimezonesData(): Promise<TimezonesData> {
  const data = await getData();
  return parseData(data);
}

export default getTimezonesData;
