import { readFile } from 'fs/promises';

async function readJsonFile(filePath: string): Promise<any> {
  const data = await readFile(filePath, { encoding: 'utf8' });
  return JSON.parse(data);
}

export { readJsonFile };
