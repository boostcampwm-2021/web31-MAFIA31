import cors from 'cors';
import express from 'express';
import { clientURL } from '../config/url.config.json';

const expressLoader = (app: express.Application) => {
  const PORT: string = process.env.PORT || '5000';
  app.use(express.json());
  app.use(cors({ origin: clientURL }));
  app.listen(PORT, () =>
    console.log(`✅ Express Server Listening on : http://localhost:${PORT} 🚀`),
  );
};

export default expressLoader;
