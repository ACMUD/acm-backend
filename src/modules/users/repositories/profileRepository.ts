import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Profile } from '../entities/Profile';

@EntityRepository()
export class ProfileRepository extends Repository<Profile> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
}

export function profileRepository() {
  return getCustomRepository(ProfileRepository);
}
