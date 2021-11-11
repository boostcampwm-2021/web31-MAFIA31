import { PUBLISH_JOB } from '@mafia/domain/constants/event';
import { useEffect, useState } from 'react';

const useGame = (socketRef: any) => {
  const [myJob, setMyJob] = useState<string>('');

  const updateMyJob = ({ job }: { job: string }): void => {
    setMyJob(() => job);
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_JOB, updateMyJob);

    return () => {
      socketRef.current.off(PUBLISH_JOB, updateMyJob);
    };
  }, [socketRef.current]);

  return { myJob };
};

export default useGame;
