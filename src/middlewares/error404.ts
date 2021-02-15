import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const exeptions = ['/graphql'];

function error404(req: Request, res: Response, next: NextFunction) {
  if (exeptions.includes(req.url)) return next();

  res
    .status(StatusCodes.NOT_FOUND)
    .send({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
}

export default error404;
