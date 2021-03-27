import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '@Services/awsBucket';

import { updateProfileDTO } from '../dtos/profileDTO';
import { Profile } from '../entities/Profile';
import { profileRepository } from '../repositories/profileRepository';

async function createBlankProfile({ email }: Partial<Profile>) {
  const profileRepo = profileRepository();

  const existingProfile = await profileRepo.findByEmail(email!);
  if (existingProfile) throw new Error('User Profile already exists');

  return profileRepo.create({ email });
}

async function getMe(id: string) {
  const profile = await profileRepository().findOne(id);
  if (!profile) throw new Error('This Profile has not exist');

  return profile;
}

async function getMeByEmail(email: string) {
  const profile = await profileRepository().findByEmail(email);
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

const acceptedTypes = ['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'];
async function updateImage(profileId: string, file: any) {
  if (!file.buffer || !file.mimetype)
    throw new Error('The file does not have a valid Format');

  if (!acceptedTypes.includes(file.mimetype))
    throw new Error(
      `The mimetype of the image is not accepted, please use one of ${acceptedTypes.join()}`
    );

  const imageUrl = await uploadFile({
    key: uuidv4(),
    buffer: file.buffer,
    mimetype: file.mimetype,
    isPublic: true,
  });

  await updateMe(profileId, { imageUrl });
}

export { createBlankProfile, getMe, getMeByEmail, updateMe, updateImage };
