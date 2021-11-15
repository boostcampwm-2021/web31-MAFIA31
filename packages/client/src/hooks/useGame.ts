import * as EVENT from '@mafia/domain/constants/event';
import { useEffect, useState } from 'react';

const useGame = (socketRef: any) => {
  const [myJob, setMyJob] = useState<string>('');

  const updateMyJob = ({ job }: { job: string }): void => {
    setMyJob(() => job);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_JOB, updateMyJob);
    socketRef.current?.on(EVENT.GAME_OVER);
    return () => {
      socketRef.current.off(EVENT.PUBLISH_JOB);
      socketRef.current.off(EVENT.GAME_OVER);
    };
  }, [socketRef.current]);

  return { myJob };
};

export default useGame;
