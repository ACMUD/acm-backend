import 'reflect-metadata'; // Load typeORM deps
import { createConnection, getConnectionOptions } from 'typeorm';

export async function createDBConnection() {
  const options = await getConnectionOptions();

  return createConnection({
    ...options,
    entities: [`${__dirname}/../**/entities/*.{js,ts}`],
  });
}
