import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { handleBadRequestError } from '../../../utils/handleError';

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
import { handleUnauthorizedError } from '../middlewares/auth';

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

async function sendSuccessfullResponse(
  res: Response,
  account: Account,
  message: string
) {
  const accessToken = await generateJWT(account, account.userProfile);
  const refreshToken = await generateRefresh(account, account.userProfile);

  return res
    .cookie(REFRESH_TOKEN_ID, refreshToken, {
      httpOnly: true,
      path: '/auth/refresh_token',
    })
    .send({
      message,
      accessToken,
    });
}

export { authRouter };
