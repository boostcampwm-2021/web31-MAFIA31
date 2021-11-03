import express from 'express';
import expressLoader from './express';

const initLoader = (app: express.Application) => {
  expressLoader(app);
};

export default initLoader;
