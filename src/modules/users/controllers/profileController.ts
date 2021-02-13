import { accountRepository } from '../repositories/accountRepository';
import { profileRepository } from '../repositories/profileRepository';

async function getMe(id: string) {
  const profile = await profileRepository().findOne(id);
  if (!profile) throw new Error('This profile has not exist');
  return profile;
}

async function getMeByAccountId(id: string) {
  const profile = await accountRepository().findAssociateProfile(id);

  if (!profile) throw new Error('This Profile has not exist');
  return profile;
}

export { getMe, getMeByAccountId };
