import express from 'express';
import dbLoader from './db';
import expressLoader from './express';
import routerLoader from './router';
import socketLoader from './socket';

const initLoader = (app: express.Application) => {
  dbLoader();
  expressLoader(app);
  routerLoader(app);
  socketLoader(app);
};

export default initLoader;
