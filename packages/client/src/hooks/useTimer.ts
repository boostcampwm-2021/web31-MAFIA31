import { TURN_CHANGE } from '@mafia/domain/constants/event';
import { useEffect, useState } from 'react';

const useTimer = (socketRef: any) => {
  const [isNight, setIsNight] = useState<boolean>(false);

  useEffect(() => {
    socketRef.current?.on(TURN_CHANGE, (isNight: boolean) => setIsNight(isNight));

    return () => {
      socketRef.current.off(TURN_CHANGE);
    };
  }, [socketRef.current]);

  return { isNight };
};

export default useTimer;
