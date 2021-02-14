import { Response } from 'express';

const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

export function addRefreshToken(res: Response, token: string) {
  res.cookie(REFRESH_TOKEN_ID, token, {
    httpOnly: true,
    path: '/auth/refresh_token',
  });
}
