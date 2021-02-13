import { Router } from 'express';
import { authRouter } from './auth';
import { profileRouter } from './profile';

const usersRouter = Router();

usersRouter.use(authRouter);
usersRouter.use(profileRouter);

export default usersRouter;
