import { Router } from 'express';
import { authRouter } from '@Modules/auth';
import { usersRouter } from '@Modules/users';

// Main Router
const apiRouter = Router();

// Add API Routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
