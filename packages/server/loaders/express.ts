import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const expressLoader = (app: express.Application) => {
  const PORT: string = process.env.PORT || '5000';
  app.use(express.json());
  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.listen(PORT, () =>
    console.log(`✅ Express Server Listening on : http://localhost:${PORT} 🚀`),
  );
};

export default expressLoader;
