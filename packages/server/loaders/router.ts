import express from 'express';
import authRouter from '../api/auth';
import roomRouter from '../api/room';

const routerLoader = (app: express.Application) => {
  app.use('/api/auth', authRouter);
  app.use('/api/room', roomRouter);
};

export default routerLoader;
