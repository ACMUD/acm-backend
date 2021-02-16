import { Request, Response } from 'express';
import { MiddlewareFn, NextFn } from 'type-graphql';
import { verifyJWT } from '../../controllers/tokenController';
import { userTokenDTO } from '../../dtos/authDTO';

interface authContext {
  req: Request;
  res: Response;
  user?: userTokenDTO;
}

const authValidation: MiddlewareFn<authContext> = async (
  { context },
  next: NextFn
) => {
  const { req } = context;
  const authToken = req.headers.authorization;
  if (!authToken) {
    throw new Error('not authenticated');
  }

  try {
    const token = authToken.split(' ')[1];
    context.user = await verifyJWT(token);
  } catch (error) {
    console.log(error);
    throw new Error('not authenticated');
  }

  return next();
};

export { authValidation, authContext };
