import express, { ErrorRequestHandler } from 'express';
import ApplicationError from './ApplicationError';

const applicationErrorHandler: ErrorRequestHandler = (
  err: ApplicationError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof ApplicationError) {
    res.status(err.status).json({ error: err.message });
  }
  next(err);
};

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(500).json({ error: err.message });
  next();
};

export { applicationErrorHandler, errorHandler };
