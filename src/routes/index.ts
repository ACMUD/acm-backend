import { Router } from 'express';
import { authRouter } from 'modules/auth';
import { usersRouter } from 'modules/users';

// Main Router
const apiRouter = Router();

// Add API Routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', usersRouter);

export default apiRouter;
