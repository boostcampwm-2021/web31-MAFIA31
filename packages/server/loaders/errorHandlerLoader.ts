import express from 'express';
import errorHandler from '../error/errorHandler';

const errorHandlerLoader = (app: express.Application) => {
  app.use(errorHandler);
};

export default errorHandlerLoader;
