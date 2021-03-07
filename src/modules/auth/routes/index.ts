import { Router } from 'express';
import { basicAuthRouter } from './auth';
import { googleAuthRouter } from './googleAuth';
import { refreshTokenRouter } from './refreshToken';

const authRouter = Router();

authRouter.use('/', basicAuthRouter);
authRouter.use('/refresh_token', refreshTokenRouter);
authRouter.use('/google', googleAuthRouter);

export { authRouter };
