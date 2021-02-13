import { accountRepository } from '../repositories/accountRepository';
import { profileRepository } from '../repositories/profileRepository';

async function getMe(id: string) {
  const profile = await profileRepository().findOne(id);
  if (!profile) throw new Error('This profile has not exist');
  return profile;
}

async function getMeByAccountId(id: string) {
  const account = await accountRepository().findOne({
    where: { id },
    relations: ['userProfile'],
  });

  if (!account) throw new Error('This Account has not exist');
  return account.userProfile;
}

export { getMe, getMeByAccountId };
