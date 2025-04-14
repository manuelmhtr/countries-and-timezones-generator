import fs from 'node:fs';
import { CountriesAndTimezones } from "../types";

function storeData(filePath: string, data: CountriesAndTimezones): void {
  const content = JSON.stringify(data);
  return fs.writeFileSync(filePath, content);
}

export default storeData;
