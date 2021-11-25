import express from 'express';
import authRouter from '../api/auth';
import roomRouter from '../api/room';
import userRouter from '../api/user';
import MethodNotAllowedError from '../error/MethodNotAllowedError';
import authMiddleware from '../middlewares/auth';

const routerLoader = (app: express.Application) => {
  app.use('/api/auth', authRouter);
  app.use('/api/rooms', authMiddleware, roomRouter);
  app.use('/api/users', authMiddleware, userRouter);
  app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) =>
    next(new MethodNotAllowedError('Requested API not exist. Check request url.')),
  );
};

export default routerLoader;
