import 'reflect-metadata'; // Load typeORM deps
import { createConnection } from 'typeorm';

export function createDBConnection() {
  return createConnection();
}
