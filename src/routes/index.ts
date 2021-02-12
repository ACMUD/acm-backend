import { Router } from 'express';
import { usersRouter } from '../modules/users';

import error404 from '../middlewares/error404';
import errorHandler from '../middlewares/errorHandler';

// Main Router
const apiRouter = Router();

// Add API Routes
apiRouter.use(usersRouter);

// Add MiddleWares
apiRouter.use(error404);
apiRouter.use(errorHandler);

export default apiRouter;
