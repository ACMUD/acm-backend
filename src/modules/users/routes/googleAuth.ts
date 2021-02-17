import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginWithGoogle, signWithGoogle } from '../controllers/authController';
import { addRefreshToken } from '../utils/refreshCookie';
import { handleBadRequestError } from '../../../utils/handleError';

const googleAuthRouter = Router();

googleAuthRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body;

    const [accessToken, refreshToken] = await signWithGoogle(tokenId);
    addRefreshToken(res, refreshToken);

    res.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

googleAuthRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.body;

    const [accessToken, refreshToken] = await loginWithGoogle(tokenId);
    addRefreshToken(res, refreshToken);

    res.send({
      message: 'Successfully Login',
      accessToken,
    });
  } catch (error) {
    handleBadRequestError(res, error);
  }
});

export { googleAuthRouter };
