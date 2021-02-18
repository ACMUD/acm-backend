import { getRepository } from 'typeorm';
import { Membership } from '../entities/Membership';

export function membershipRepository() {
  return getRepository(Membership);
}
