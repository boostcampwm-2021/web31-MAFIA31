import express from 'express';
import { applicationErrorHandler, errorHandler } from '../error/errorHandler';

const errorHandlerLoader = (app: express.Application) => {
  app.use(applicationErrorHandler);
  app.use(errorHandler);
};

export default errorHandlerLoader;
