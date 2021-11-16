import { useEffect } from 'react';

const usePreventLeave = () => {
  const askIfLeave = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', askIfLeave);
    return () => {
      window.removeEventListener('beforeunload', askIfLeave);
    };
  }, []);
};

export default usePreventLeave;
