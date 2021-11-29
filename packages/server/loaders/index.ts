import express from 'express';
import dbLoader from './db';
import errorHandlerLoader from './errorHandlerLoader';
import expressLoader from './express';
import routerLoader from './router';

const initLoader = (app: express.Application) => {
  dbLoader();
  expressLoader(app);
  routerLoader(app);
  errorHandlerLoader(app);
};

export default initLoader;
