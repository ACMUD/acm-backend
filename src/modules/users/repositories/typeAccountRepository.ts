import { getRepository } from 'typeorm';
import { TypeAccount } from '../entities/TypeAccount';

export function typeAccountRepository() {
  return getRepository(TypeAccount);
}
