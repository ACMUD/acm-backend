import { Router } from 'express';
import { authRouter } from './auth';
import { profileRouter } from './profile';

const usersRouter = Router();

usersRouter.use('/auth', authRouter);
usersRouter.use('/profile', profileRouter);

export { usersRouter };
