import type {TimezonesData} from '../types';
import getData from './get-data';
import parseData from './parse-data';

async function getTimezonesData(): Promise<TimezonesData> {
  const data = await getData();
  return parseData(data);
}

export default getTimezonesData;
