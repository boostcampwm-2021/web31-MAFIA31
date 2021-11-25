import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import { clientURL, socketURL } from '../config/url.config.json';

const expressLoader = (app: express.Application) => {
  const PORT: string = process.env.PORT || '5000';

  app.use(cookieParser());
  app.use(express.json());
  app.use(logger('dev'));
  const whiteList = [clientURL, socketURL];
  app.use(
    cors({
      origin: (origin, callback) => {
        if (whiteList.includes(origin!)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    }),
  );
  app.listen(PORT, () =>
    console.log(`✅ Express Server Listening on : http://localhost:${PORT} 🚀`),
  );
};

export default expressLoader;
