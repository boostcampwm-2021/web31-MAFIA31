import axios from 'axios';
import { apiURL } from '../config/url.config.json';

const apiClient = axios.create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});

export default apiClient;
