import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  handleBadRequestError,
  handleUnauthorizedError,
} from '../../../utils/handleError';
import { addRefreshToken } from '../utils/refreshCookie';

import {
  createAccount,
  verifyAccount,
  getAccountById,
} from '../controllers/authController';
import {
  generateJWT,
  generateRefresh,
  verifyRefresh,
} from '../controllers/tokenController';

import { Account } from '../entities/Account';

const authRouter = Router();
const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const createdAccount = await createAccount(email, password);
    res.status(StatusCodes.CREATED);
    sendSuccessfullResponse(
      res,
      createdAccount,
      'The account has been created successfully'
    );
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const loggedUSer = await verifyAccount(email, password);
    sendSuccessfullResponse(res, loggedUSer, 'Successfull Login');
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
    sendSuccessfullResponse(res, account, 'Successfull Generated Token');
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

authRouter.post('/logout', async (req: Request, res: Response) => {
  addRefreshToken(res, '').send({ message: 'Successfull Logout' });
});

async function sendSuccessfullResponse(
  res: Response,
  account: Account,
  message: string
) {
  const accessToken = await generateJWT(account, account.userProfile);
  const refreshToken = await generateRefresh(account, account.userProfile);

  return addRefreshToken(res, refreshToken).send({
    message,
    accessToken,
  });
}

export { authRouter };
