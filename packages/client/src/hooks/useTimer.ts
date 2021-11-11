import { TIMER } from '@mafia/domain/constants/event';
import { useEffect, useState } from 'react';

const useTimer = (socketRef: any) => {
  const [timer, setTimer] = useState<number>(60);
  const updateTimer = (remainTime: number): void => {
    setTimer(() => remainTime);
  };

  useEffect(() => {
    socketRef.current?.on(TIMER, updateTimer);

    return () => {
      socketRef.current.off(TIMER, updateTimer);
    };
  }, [socketRef.current]);

  return { timer };
};

export default useTimer;
