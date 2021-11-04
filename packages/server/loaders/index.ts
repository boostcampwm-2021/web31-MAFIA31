import express from 'express';
import expressLoader from './express';
import socketLoader from './socket';

const initLoader = (app: express.Application) => {
  expressLoader(app);
  socketLoader(app);
};

export default initLoader;
