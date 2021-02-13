import { Request, Response, Router } from 'express';
import { getMeByAccountId } from '../controllers/profileController';
import authValidation, { RequestWithUser } from '../middlewares/auth';

const profileRouter = Router();

// MiddleWare
profileRouter.use(authValidation);

// Routes
profileRouter.get('/profile', async (req: RequestWithUser, res: Response) => {
  if (!req.user) throw new Error('No auth provider');

  const { accountId } = req.user;
  const data = await getMeByAccountId(accountId);
  res.send({ data });
});

profileRouter.put('/profile', async (req: Request, res: Response) => {
  // res.send({ id: req.userId });
});

export { profileRouter };
