import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

function errorHandler(err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
}

export default errorHandler;
