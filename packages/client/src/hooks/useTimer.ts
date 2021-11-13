import { TIMER, TURN_CHANGE } from '@mafia/domain/constants/event';
import timeDisplayer from '@utils/time-displayer';
import { useEffect, useRef, useState } from 'react';

const useTimer = (socketRef: any) => {
  const [isNight, setIsNight] = useState<boolean>(false);
  const seconds = useRef<number>();
  const [timer, setTimer] = useState<string>('00:00');

  const updateTimer = (remainTime: number): void => {
    seconds.current = remainTime;
    const { 분, 초 } = timeDisplayer(seconds.current);
    setTimer(() => `${분}:${초}`);
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
