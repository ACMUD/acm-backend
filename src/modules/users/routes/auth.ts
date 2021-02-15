import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { login, logout, signup } from '../controllers/authController';
import { getAccountById } from '../controllers/accountController';
import { verifyRefresh } from '../controllers/tokenController';

import { getTokens } from '../utils/asociateTokens';
import {
  handleBadRequestError,
  handleUnauthorizedError,
} from '../../../utils/handleError';

const authRouter = Router();
const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const response = await signup(res, email, password);
    res.status(StatusCodes.CREATED).send(response);
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const response = await login(res, email, password);
    res.send(response);
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/logout', async (req: Request, res: Response) => {
  const response = await logout(res);
  res.send(response);
});

// Refresh Token EndPoint
authRouter.post('/refresh_token', async (req: Request, res: Response) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_ID];
  if (!refreshToken) {
    return handleUnauthorizedError(res);
  }

  try {
    const { accountId } = await verifyRefresh(refreshToken);
    const account = await getAccountById(accountId);
    const accessToken = await getTokens(res, account);
    const response = {
      message: 'Successfull Generated Token',
      accessToken,
    };

    res.send(response);
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

export { authRouter };
