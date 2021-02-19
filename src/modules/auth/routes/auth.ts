import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { login, signup, verifySingup } from '../controllers/authController';
import { getAccountById } from '../controllers/accountController';

import { addRefreshToken } from '../utils/refreshCookie';
import { verifyRefreshToken } from 'services/jwt';
import { getTokens } from '../utils/generateTokens';

import {
  handleBadRequestError,
  handleUnauthorizedError,
} from 'utils/handleError';

const basicAuthRouter = Router();
const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

basicAuthRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, verifyPath = '' } = req.body;

    const verifyURL = `https://${req.headers.host}/${verifyPath}`;
    await signup({ email, password }, verifyURL);

    res.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully',
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

basicAuthRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [accessToken, refreshToken] = await login({ email, password });
    addRefreshToken(res, refreshToken);

    res.send({
      message: 'Successfully Login',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

basicAuthRouter.post('/logout', async (req: Request, res: Response) => {
  addRefreshToken(res, '');
  res.send({
    message: 'Successfull Logout',
  });
});

// Refresh Token EndPoint
basicAuthRouter.post('/refresh_token', async (req: Request, res: Response) => {
  const token = req.cookies[REFRESH_TOKEN_ID];
  if (!token) {
    return handleUnauthorizedError(res);
  }

  try {
    const { accountId } = await verifyRefreshToken(token);
    const account = await getAccountById(accountId);
    const [accessToken, refreshToken] = await getTokens(account);
    addRefreshToken(res, refreshToken);

    const response = {
      message: 'Successfull Generated Token',
      accessToken,
    };

    res.send(response);
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

export { basicAuthRouter };
