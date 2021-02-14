import { Router } from 'express';
import { usersRouter } from '../modules/users';

// Main Router
const apiRouter = Router();

// Add API Routes
apiRouter.use(usersRouter);

export default apiRouter;
