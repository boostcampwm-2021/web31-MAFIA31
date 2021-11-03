import express from 'express';

const expressLoader = (app: express.Application) => {
  const PORT: string = process.env.PORT || '5000';

  app.listen(PORT, () =>
    console.log(`✅ Express Server Listening on : http://localhost:${PORT} 🚀`),
  );
};

export default expressLoader;
