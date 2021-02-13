import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { verifyJWT } from '../controllers/tokenController';
import { authDTO } from '../dtos/authDTO';

export interface RequestWithUser extends Request {
  user?: authDTO;
}

async function isAuth(req: RequestWithUser, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    return;
  }

  try {
    const token = authToken.split(' ')[1];
    req.user = await verifyJWT(token);
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
  }
}

export default isAuth;
