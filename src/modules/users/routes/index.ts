import { Router } from 'express';
import { profileRouter } from './profile';

const usersRouter = Router();

usersRouter.use('/', profileRouter);

export { usersRouter };
