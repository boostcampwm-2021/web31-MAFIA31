import * as EVENT from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import timeDisplayer from '@utils/time-displayer';
import { useEffect, useRef, useState } from 'react';

const useTimer = () => {
  const { socketRef } = useSocketContext();
  const [isNight, setIsNight] = useState<boolean>(false);
  const seconds = useRef<number>();
  const [timer, setTimer] = useState<string>('00:00');

  const updateTimer = (remainTime: number): void => {
    seconds.current = remainTime;
    const { 분, 초 } = timeDisplayer(seconds.current);
    setTimer(() => `${분}:${초}`);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.TIMER, updateTimer);
    socketRef.current?.on(EVENT.TURN_CHANGE, (isNight: boolean) => setIsNight(isNight));

    return () => {
      socketRef.current?.off(EVENT.TIMER, updateTimer);
      socketRef.current?.off(EVENT.TURN_CHANGE);
    };
  }, [socketRef.current]);

  return { isNight, timer };
};

export default useTimer;
