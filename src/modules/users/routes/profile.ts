import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import { handleBadRequestError } from '@Utils/handleError';
import { authValidation, RequestWithUser } from '@Middlewares/authValidation';
import { useSingleUploader } from '@Middlewares/uploader';

import { getMe, updateMe, updateImage } from '../controllers/profileController';

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
  const { firstName, lastName, imageUrl, description, udCode } = req.body;
  await updateMe(profileId, {
    firstName,
    lastName,
    imageUrl,
    description,
    udCode,
  });

  res.send({ message: 'The profile has been updated successfully' });
});

profileRouter.post(
  '/upload_image',
  useSingleUploader('image'),
  async (req: RequestWithUser, res: Response) => {
    try {
      const { profileId } = req.user!;
      await updateImage(profileId, req.file);
      res.status(StatusCodes.CREATED).send({
        message: 'The profile image has been upload successfully',
      });
    } catch (error) {
      handleBadRequestError(res, error);
    }
  }
);

export { profileRouter };
