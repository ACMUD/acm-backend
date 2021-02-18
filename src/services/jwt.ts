import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwttoken';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'supersecretcookiestoken';

export interface userTokenDTO {
  accountId: string;
  profileId: string;
  roles?: string[];
}

async function generateAccessToken(payload: userTokenDTO) {
  return sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

async function verifyAccessToken(jwt: string) {
  const auth = verify(jwt, JWT_SECRET);
  if (!auth) throw new Error('Invalid Access Token');
  return auth as userTokenDTO;
}

async function generateRefreshToken(payload: userTokenDTO) {
  return sign(payload, COOKIE_SECRET, { expiresIn: '7d' });
}

async function verifyRefreshToken(jwt: string) {
  const auth = verify(jwt, COOKIE_SECRET);
  if (!auth) throw new Error('Invalid Refresh Token');
  return auth as userTokenDTO;
}

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
