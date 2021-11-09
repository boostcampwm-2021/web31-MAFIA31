import express from 'express';
import expressLoader from './express';
import routerLoader from './router';
import socketLoader from './socket';

const initLoader = (app: express.Application) => {
  expressLoader(app);
  routerLoader(app);
  socketLoader(app);
};

export default initLoader;
