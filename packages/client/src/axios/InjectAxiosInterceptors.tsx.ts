import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setupInterceptors } from './apiClient';

const InjectAxiosInterceptors = () => {
  const history = useHistory();

  useEffect(() => {
    setupInterceptors(history);
  }, [history]);
  return null;
};

export default InjectAxiosInterceptors;
