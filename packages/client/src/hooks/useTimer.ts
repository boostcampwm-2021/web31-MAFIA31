import timeDisplayer from '@utils/time-displayer';
import { useRef, useState } from 'react';

const useTimer = () => {
  const seconds = useRef<number | undefined>(undefined);
  const [timer, setTimer] = useState<string>('00:00');

  const updateTimer = (remainTime: number): void => {
    seconds.current = remainTime;
    const { 분, 초 } = timeDisplayer(seconds.current);
    setTimer(() => `${분}:${초}`);
  };

  return { seconds, timer, updateTimer };
};

export default useTimer;
