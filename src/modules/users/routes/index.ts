import { Router } from 'express';
import { authRouter } from './auth';
import { googleAuthRouter } from './googleAuth';
import { profileRouter } from './profile';

const usersRouter = Router();

usersRouter.use('/auth', authRouter);
usersRouter.use('/auth/google', googleAuthRouter);
usersRouter.use('/profile', profileRouter);

export { usersRouter };
