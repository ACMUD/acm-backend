import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { login, signup, verifySingup } from '../controllers/authController';
import { addRefreshToken } from '../utils/refreshCookie';

import { handleBadRequestError } from 'utils/handleError';

const basicAuthRouter = Router();

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

basicAuthRouter.post('/verify', async (req: Request, res: Response) => {
  try {
    const { verifyToken } = req.body;

    const [accessToken, refreshToken] = await verifySingup(verifyToken);
    addRefreshToken(res, refreshToken);

    res.send({
      message: 'Successful account verification',
      accessToken,
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

export { basicAuthRouter };
