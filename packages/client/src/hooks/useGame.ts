import * as EVENT from '@mafia/domain/constants/event';
import { PlayerResult } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useGame = () => {
  const { socketRef } = useSocketContext();
  const [myJob, setMyJob] = useState<string>('');
  const history = useHistory();

  const updateMyJob = ({ job }: { job: string }): void => {
    setMyJob(() => job);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_JOB, updateMyJob);
    socketRef.current?.on(EVENT.GAME_OVER, (gameResult: PlayerResult[]) =>
      history.push({
        pathname: '/game-result',
        state: { playerResultList: gameResult },
      }),
    );

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_JOB, updateMyJob);
      socketRef.current?.off(EVENT.GAME_OVER);
    };
  }, [socketRef.current]);

  return { myJob };
};

export default useGame;
