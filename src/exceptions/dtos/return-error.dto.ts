import { AppException } from '@exceptions/app-exception';
import { Response } from 'express';

export class ReturnError {
  error: boolean;
  message: string;
  errorCode?: number;

  constructor(res: Response, error: Error) {
    this.error = true;
    this.message = error.message;

    if (error instanceof AppException) {
      this.errorCode = error.errorCode;
    }

    res.status(this.errorCode || 500).send(this);
  }
}
