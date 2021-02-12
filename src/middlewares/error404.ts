import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

function error404(req: Request, res: Response) {
  res
    .status(StatusCodes.NOT_FOUND)
    .send({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
}

export default error404;
