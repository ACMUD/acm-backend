import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function handleBadRequestError(res: Response, error: any) {
  console.log(error);
  res.status(StatusCodes.BAD_REQUEST).send({
    message: error.message,
  });
}
