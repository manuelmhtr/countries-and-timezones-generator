import fs from 'node:fs';
import { CountriesAndTimezonesData } from "../types";

function storeData(filePath: string, data: CountriesAndTimezonesData): void {
  const content = JSON.stringify(data);
  return fs.writeFileSync(filePath, content);
}

export default storeData;
