import { User } from '@mafia/domain/types/user';
import axios from 'axios';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import { githubClientId, githubClientSecret } from '../../config/github.config.json';
import { secret } from '../../config/jwt.config.json';
import UserService from '../user/user.service';

const getAccessToken = async (code: string) => {
  const {
    data: { access_token: accessToken },
  } = await axios({
    method: 'POST',
    url: `https://github.com/login/oauth/access_token`,
    data: {
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code,
    },
    headers: { Accept: 'application/json' },
  });

  return accessToken;
};

const AuthController = {
  async getUserInfo(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.query.code) return;

    const accessToken = await getAccessToken(req.query.code as string);
    const { data } = await axios({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user: User = { userName: data.login, profileImg: data.avatar_url };
    const token = jwt.sign(user, secret, { expiresIn: '1h' });
    res.cookie('token', token);

    try {
      await UserService.findOneOrCreate(data.login, data.avatar_url);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
