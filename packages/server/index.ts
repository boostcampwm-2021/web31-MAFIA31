import express from 'express';
import initLoader from './loaders';

const startServer = () => {
  const app: express.Application = express();

  initLoader(app);
};

startServer();
