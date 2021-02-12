import { Router, Request, Response } from 'express';
import error404 from '../middlewares/error404';
import errorHandler from '../middlewares/errorHandler';

// Main Router
const apiRouter = Router();

// Add API Routes
apiRouter.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hola mundo' });
});

apiRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;
  res.send(data);
});

// Add MiddleWares
apiRouter.use(error404);
apiRouter.use(errorHandler);

export default apiRouter;
