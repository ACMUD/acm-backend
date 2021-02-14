import { updateProfileDTO } from '../dtos/profileDTO';
import { profileRepository } from '../repositories/profileRepository';

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

  return profileRepository().update(profileId, data);
}

export { getMe, updateMe };
