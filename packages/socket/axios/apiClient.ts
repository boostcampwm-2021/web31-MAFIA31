import axios from 'axios';
import jwt from 'jsonwebtoken';
import { secret } from '../config/jwt.config.json';
import { apiURL, socketURL } from '../config/url.config.json';

const token = jwt.sign({ userName: 'server' }, secret);

const apiClient = axios.create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
  headers: {
    Cookie: `token=${token};`,
    origin: socketURL,
  },
});

export default apiClient;
