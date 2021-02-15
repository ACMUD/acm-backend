import { Response } from 'express';

export interface gqlContext {
  res: Response;
  req: Request;
}
