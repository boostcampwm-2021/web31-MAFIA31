import express from 'express';
import authRouter from '../api/auth';

const routerLoader = (app: express.Application) => {
  app.use('/api/auth', authRouter);
};

export default routerLoader;
