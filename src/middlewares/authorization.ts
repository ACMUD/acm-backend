import { NextFunction, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { handleUnauthorizedError } from 'utils/handleError';
import { RequestWithUser } from './authValidation';

export function requireRoles(...requiredRoles: string[]) {
  return function authValidation(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    if (!req.user) return handleUnauthorizedError(res);

    const { roles } = req.user;

    if (!roles || !roles.some(rol => requiredRoles.includes(rol))) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ message: getReasonPhrase(StatusCodes.FORBIDDEN) });
    }

    next();
  };
}
