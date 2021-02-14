import { profileRepository } from '../repositories/profileRepository';

async function getMe(id: string) {
  const profile = await profileRepository().findOne(id);
  if (!profile) throw new Error('This Profile has not exist');

  return profile;
}

export { getMe };
