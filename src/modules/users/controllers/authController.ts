import { Response } from 'express';
import { createAccount, verifyAccount } from './accountController';

import { addRefreshToken } from '../utils/refreshCookie';
import { getTokens } from '../utils/asociateTokens';

async function signup(res: Response, email: string, password: string) {
  const createdAccount = await createAccount(email, password);
  const accessToken = await getTokens(res, createdAccount);
  return {
    message: 'The account has been created successfully',
    accessToken,
  };
}

async function login(res: Response, email: string, password: string) {
  const loggedUSer = await verifyAccount(email, password);
  const accessToken = await getTokens(res, loggedUSer);
  return {
    message: 'Successfull Login',
    accessToken,
  };
}

async function logout(res: Response) {
  addRefreshToken(res, '');
  return {
    message: 'Successfull Logout',
  };
}

export { signup, login, logout };
