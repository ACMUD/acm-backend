import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createAccount, verifyAccount } from '../controllers/authController';
import { generateJWT } from '../controllers/tokenController';

const authRouter = Router();

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Invalid Credentials');

    const createdAccount = await createAccount(email, password);
    const jwt = await generateJWT(createdAccount);

    res.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully',
      accessToken: jwt,
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

    const loggedUSer = await verifyAccount(email, password);
    const jwt = await generateJWT(loggedUSer);

    res.status(StatusCodes.OK).send({
      message: 'Successfull Login',
      accessToken: jwt,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({
      message: error.message,
    });
  }
});

export { authRouter };
