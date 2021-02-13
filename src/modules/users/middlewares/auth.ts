import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { verifyJWT } from '../controllers/tokenController';
import { authDTO } from '../dtos/authDTO';

export interface RequestWithUser extends Request {
  user?: authDTO;
}

async function authValidation(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
  }

  try {
    const token = authToken.split(' ')[1];
    req.user = await verifyJWT(token);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ message: error.message });
  }
}

export default authValidation;
