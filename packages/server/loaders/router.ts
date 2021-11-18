import express from 'express';
import authRouter from '../api/auth';
import roomRouter from '../api/room';
import userRouter from '../api/user';

const routerLoader = (app: express.Application) => {
  app.use('/api/auth', authRouter);
  app.use('/api/rooms', roomRouter);
  app.use('/api/users', userRouter);
};

export default routerLoader;
