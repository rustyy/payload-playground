import { NextFunction, Response } from 'express';
import { PayloadRequest } from 'payload/types';

export const configurableMiddleware =
  (msg: string) =>
  (_req: PayloadRequest, _res: Response, next: NextFunction) => {
    console.log(msg);
    next();
  };

export const middleware = (
  _req: PayloadRequest,
  _res: Response,
  next: NextFunction
) => {
  console.log('Hello from middleware');
  next();
};
