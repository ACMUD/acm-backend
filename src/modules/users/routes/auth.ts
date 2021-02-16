import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { login, signup } from '../controllers/authController';
import { getAccountById } from '../controllers/accountController';
import { verifyRefresh, getTokens } from '../controllers/tokenController';

import { addRefreshToken } from '../utils/refreshCookie';
import {
  handleBadRequestError,
  handleUnauthorizedError,
} from '../../../utils/handleError';

const authRouter = Router();
const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [accessToken, refreshToken] = await signup({ email, password });
    addRefreshToken(res, refreshToken);

    res.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const [accessToken, refreshToken] = await login({ email, password });
    addRefreshToken(res, refreshToken);

    res.send({
      message: 'The account has been created successfully',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/logout', async (req: Request, res: Response) => {
  addRefreshToken(res, '');
  res.send({
    message: 'Successfull Logout',
  });
});

// Refresh Token EndPoint
authRouter.post('/refresh_token', async (req: Request, res: Response) => {
  const token = req.cookies[REFRESH_TOKEN_ID];
  if (!token) {
    return handleUnauthorizedError(res);
  }

  try {
    const { accountId } = await verifyRefresh(token);
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

export { authRouter };
