import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export function handleBadRequestError(res: Response, error: any) {
  console.log(error);
  res.status(StatusCodes.BAD_REQUEST).send({
    message: error?.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
  });
}

export function handleUnauthorizedError(res: Response) {
  res
    .status(StatusCodes.UNAUTHORIZED)
    .send({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
}
