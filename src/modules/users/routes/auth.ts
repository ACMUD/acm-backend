import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  createAccount,
  verifyAccount,
  getAccountById,
} from '../controllers/authController';
import { verifyRefresh } from '../controllers/tokenController';

import { addRefreshToken } from '../utils/refreshCookie';
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

    const createdAccount = await createAccount(email, password);
    const accessToken = await getTokens(res, createdAccount);

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

    const loggedUSer = await verifyAccount(email, password);
    const accessToken = await getTokens(res, loggedUSer);

    res.send({
      message: 'Successfull Login',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/refresh_token', async (req: Request, res: Response) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_ID];
  if (!refreshToken) {
    return handleUnauthorizedError(res);
  }

  try {
    const { accountId } = await verifyRefresh(refreshToken);
    const account = await getAccountById(accountId);
    const accessToken = await getTokens(res, account);

    res.send({
      message: 'Successfull Generated Token',
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

export { authRouter };
