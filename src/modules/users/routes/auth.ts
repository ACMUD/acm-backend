import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccount, verifyAccount } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    await createAccount(email, password);

    res.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({
      message: error.message,
    });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    await verifyAccount(email, password);

    res.status(StatusCodes.OK).send({
      message: 'Successfull Login',
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({
      message: error.message,
    });
  }
});

export { authRouter };
