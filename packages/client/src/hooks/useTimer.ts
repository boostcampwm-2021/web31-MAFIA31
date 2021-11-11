import { TIMER, TURN_CHANGE } from '@mafia/domain/constants/event';
import { useEffect, useState } from 'react';

const useTimer = (socketRef: any) => {
  const [isNight, setIsNight] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const updateTimer = (remainTime: number): void => {
    setTimer(() => remainTime);
  };

  useEffect(() => {
    socketRef.current?.on(TIMER, updateTimer);
    socketRef.current?.on(TURN_CHANGE, (isNight: boolean) => setIsNight(isNight));

    return () => {
      socketRef.current.off(TIMER, updateTimer);
      socketRef.current.off(TURN_CHANGE);
    };
  }, [socketRef.current]);

  return { isNight, timer };
};

export default useTimer;
