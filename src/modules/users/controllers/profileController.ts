import { updateProfileDTO } from '../dtos/profileDTO';
import { Profile } from '../entities/Profile';
import { profileRepository } from '../repositories/profileRepository';

async function createBlankProfile({ email }: Partial<Profile>) {
  const profile = await profileRepository().create({ email });
  if (!profile) throw new Error('This Profile already exists');

  return profile;
}

async function getMeByEmail(email: string) {
  const profile = await profileRepository().findByEmail(email);
  if (!profile) throw new Error('This Profile has not exist');

  return profile;
}

async function getMe(id: string) {
  const profile = await profileRepository().findOne(id);
  if (!profile) throw new Error('This Profile has not exist');

  return profile;
}

async function updateMe(profileId: string, data: updateProfileDTO) {
  for (const key in data) {
    const keyParsed = key as keyof updateProfileDTO;
    const element = data[keyParsed];
    if (element === null || element === undefined) {
      delete data[keyParsed];
    }
  }

  if (Object.keys(data).length > 0) {
    profileRepository().update(profileId, data);
  }
}

export { createBlankProfile, getMe, getMeByEmail, updateMe };
