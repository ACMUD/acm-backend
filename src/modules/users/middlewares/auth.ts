import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { verifyJWT } from '../controllers/tokenController';
import { authDTO } from '../dtos/authDTO';

interface RequestWithUser extends Request {
  user?: authDTO;
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

function handleUnauthorizedError(res: Response) {
  res
    .status(StatusCodes.UNAUTHORIZED)
    .send({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
}

export { authValidation, RequestWithUser, handleUnauthorizedError };
