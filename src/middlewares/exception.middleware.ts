import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { NextFunction, Request, Response } from 'express';

export const exeptionHandleMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }

  new ReturnError(res, error);
};
