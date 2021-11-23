import express from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../config/jwt.config.json';
import UnauthorizedError from '../error/UnauthorizedError';

const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthorizedError('Request not include token');
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthorizedError(error.message));
    } else {
      next(error);
    }
  }
};

export default authMiddleware;
