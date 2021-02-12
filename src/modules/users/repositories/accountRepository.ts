import { getRepository } from 'typeorm';
import { Account } from '../entities/Account';

export function accountRepository() {
  return getRepository(Account);
}
