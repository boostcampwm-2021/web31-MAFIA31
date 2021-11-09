import axios from 'axios';
import express from 'express';

const AuthController = {
  getAcccessToken: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { data } = await axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token`,
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code,
      },
      headers: { Accept: 'application/json' },
    });
    console.log(data);
    next();
  },
};

export default AuthController;
