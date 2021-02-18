import { Router } from 'express';
import { basicAuthRouter } from './auth';
import { googleAuthRouter } from './googleAuth';
import { refreshTokenRouter } from './refreshToken';

const authRouter = Router();

authRouter.use('/auth', basicAuthRouter);
authRouter.use('/auth/refresh_token', refreshTokenRouter);
authRouter.use('/auth/google', googleAuthRouter);

export { authRouter };
