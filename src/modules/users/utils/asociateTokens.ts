import { Response } from 'express';
import { generateJWT, generateRefresh } from '../controllers/tokenController';
import { addRefreshToken } from './refreshCookie';
import { Account } from '../entities/Account';

export async function getTokens(res: Response, account: Account) {
  const accessToken = await generateJWT(account, account.userProfile);
  const refreshToken = await generateRefresh(account, account.userProfile);

  addRefreshToken(res, refreshToken);

  return accessToken;
}
