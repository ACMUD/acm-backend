import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwttoken';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'supersecretcookiestoken';
const EMAIL_SECRET = process.env.EMAIL_SECRET || 'supersecretemailtoken';

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

async function generateEmailToken(payload: any) {
  return sign(payload, EMAIL_SECRET);
}

async function verifyEmailToken(jwt: string) {
  const emailPayload = verify(jwt, EMAIL_SECRET);
  if (!emailPayload) throw new Error('Invalid Email Token');
  return emailPayload as any;
}

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateEmailToken,
  verifyEmailToken,
};
