import { Response, Router } from 'express';
import { getMe } from '../controllers/profileController';
import {
  authValidation,
  handleAuthError,
  RequestWithUser,
} from '../middlewares/auth';

const profileRouter = Router();

// MiddleWare
profileRouter.use(authValidation);

// Routes
profileRouter.get('/', async (req: RequestWithUser, res: Response, next) => {
  if (!req.user) return handleAuthError(res);

  const { profileId } = req.user;
  const profile = await getMe(profileId);
  res.send({ profile });
});

profileRouter.put('/', async (req: RequestWithUser, res: Response) => {
  if (!req.user) return handleAuthError(res);

  // res.send({ id: req.userId });
});

export { profileRouter };
