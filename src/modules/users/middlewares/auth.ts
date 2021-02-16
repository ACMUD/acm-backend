import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { handleUnauthorizedError } from '../../../utils/handleError';

import { verifyJWT } from '../controllers/tokenController';
import { userTokenDTO } from '../dtos/userTokenDTO';

interface RequestWithUser extends Request {
  user?: userTokenDTO;
}

async function authValidation(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) return handleUnauthorizedError(res);

  try {
    const token = authToken.split(' ')[1];
    req.user = await verifyJWT(token);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ message: error.message });
  }
}

export { authValidation, RequestWithUser };
