import { Response, Router } from 'express';
import { authValidation, RequestWithUser } from 'middlewares/authValidation';

import { getMe, updateMe } from '../controllers/profileController';

const profileRouter = Router();

// MiddleWare
profileRouter.use(authValidation);

// Routes
profileRouter.get('/', async (req: RequestWithUser, res: Response, next) => {
  const { profileId } = req.user!;
  const profile = await getMe(profileId);

  res.send(profile);
});

profileRouter.put('/', async (req: RequestWithUser, res: Response) => {
  const { profileId } = req.user!;
  const { firstName, lastName, description, udCode } = req.body;
  await updateMe(profileId, {
    firstName,
    lastName,
    description,
    udCode,
  });

  res.send({ message: 'The profile has been updated successfully' });
});

export { profileRouter };
