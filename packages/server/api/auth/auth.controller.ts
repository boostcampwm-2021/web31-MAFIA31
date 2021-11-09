import axios from 'axios';
import { User } from 'domain/types/user';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const getAccessToken = async (code: string) => {
  const {
    data: { access_token: accessToken },
  } = await axios({
    method: 'POST',
    url: `https://github.com/login/oauth/access_token`,
    data: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    headers: { Accept: 'application/json' },
  });

  return accessToken;
};

const AuthController = {
  async getUserInfo(req: express.Request, res: express.Response) {
    if (!req.query.code) return;

    const accessToken = await getAccessToken(req.query.code as string);
    const { data } = await axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const user: User = { userName: data.login };
    res.json(user);
  },
};

export default AuthController;
