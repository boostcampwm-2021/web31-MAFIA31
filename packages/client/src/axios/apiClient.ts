import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});

export const setupInterceptors = (history: any) => {
  apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
      const { status } = err.response;

      if (status === 401 || status === 404 || status === 400) {
        history.push('/');
        history.go();
      }
      return Promise.reject(err);
    },
  );
};

export default apiClient;
