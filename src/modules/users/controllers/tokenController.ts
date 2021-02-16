import { sign, verify } from 'jsonwebtoken';
import { Account } from '../entities/Account';
import { Profile } from '../entities/Profile';
import { authDTO } from '../dtos/authDTO';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwttoken';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'supersecretcookiestoken';

async function generateJWT(account: Account, profile: Profile) {
  return sign(
    {
      accountId: account.id,
      profileId: profile.id,
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

async function verifyJWT(jwt: string) {
  const auth = verify(jwt, JWT_SECRET);
  if (!auth) throw new Error('Invalid Access Token');
  return auth as authDTO;
}

async function generateRefresh(account: Account, profile: Profile) {
  return sign(
    {
      accountId: account.id,
      profileId: profile.id,
    },
    COOKIE_SECRET,
    { expiresIn: '7d' }
  );
}

async function verifyRefresh(jwt: string) {
  const auth = verify(jwt, COOKIE_SECRET);
  if (!auth) throw new Error('Invalid Refresh Token');
  return auth as authDTO;
}

async function getTokens(account: Account) {
  if (!account.userProfile)
    throw new Error("Account don't have profile associate");

  const accessToken = await generateJWT(account, account.userProfile);
  const refreshToken = await generateRefresh(account, account.userProfile);

  return [accessToken, refreshToken];
}

export { generateJWT, verifyJWT, generateRefresh, verifyRefresh, getTokens };
