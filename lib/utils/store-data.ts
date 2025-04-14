import fs from 'node:fs';
import {type CountriesAndTimezonesData} from '../types';

function storeData(filePath: string, data: CountriesAndTimezonesData): void {
  const content = JSON.stringify(data);
  fs.writeFileSync(filePath, content);
}

export default storeData;
