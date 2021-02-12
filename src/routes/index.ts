import { Router, Request, Response } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hola mundo' });
});

apiRouter.post('/', (req: Request, res: Response) => {
  res.json(req.body);
});

export default apiRouter;
