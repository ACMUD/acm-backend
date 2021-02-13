import { Router } from 'express';
import { authRouter } from './auth';

const usersRouter = Router();

usersRouter.use(authRouter);

export default usersRouter;
