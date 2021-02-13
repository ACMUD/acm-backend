import { getRepository } from 'typeorm';
import { Profile } from '../entities/Profile';

export function profileRepository() {
  return getRepository(Profile);
}
