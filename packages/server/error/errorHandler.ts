import express, { ErrorRequestHandler } from 'express';
import ApplicationError from './ApplicationError';

const errorHandler: ErrorRequestHandler = (
  err: ApplicationError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(err.status).json({ error: err.message });
  next();
};

export default errorHandler;
