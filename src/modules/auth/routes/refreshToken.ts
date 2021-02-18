import { Request, Response, Router } from 'express';
import { getAccountById } from '../controllers/accountController';

import { addRefreshToken } from '../utils/refreshCookie';
import {
  handleBadRequestError,
  handleUnauthorizedError,
} from 'utils/handleError';
import { verifyRefreshToken } from 'services/jwt';
import { getTokens } from '../utils/generateTokens';

const refreshTokenRouter = Router();
const REFRESH_TOKEN_ID = process.env.REFRESH_TOKEN_ID || 'jid';

// Refresh Token EndPoint
refreshTokenRouter.post(
  '/refresh_token',
  async (req: Request, res: Response) => {
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
  }
);

export { refreshTokenRouter };
