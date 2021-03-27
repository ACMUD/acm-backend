import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
}

export default errorHandler;
