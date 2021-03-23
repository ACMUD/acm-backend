import {
  generateAccessToken,
  generateRefreshToken,
  userTokenDTO,
} from '@Services/jwt';
import { Account } from '../entities/Account';

export async function getTokens(acount: Account) {
  if (!acount.userProfile)
    throw new Error("Account don't have Profile associated");

  const payload: userTokenDTO = {
    accountId: `${acount.id}`,
    profileId: `${acount.userProfile?.id}`,
    roles: acount.typeAccount?.map(t => t.name) || [],
  };

  const accessToken = await generateAccessToken(payload);
  const refreshToen = await generateRefreshToken(payload);

  return [accessToken, refreshToen];
}
