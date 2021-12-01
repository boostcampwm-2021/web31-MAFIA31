import * as EVENT from '@mafia/domain/constants/event';
import { PlayerResult } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { Event } from '@src/types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSocketEvent from './useSocketEvent';

const useGame = () => {
  const history = useHistory();
  const { socketRef } = useSocketContext();
  const [isNight, setIsNight] = useState<boolean>(false);
  const [myJob, setMyJob] = useState<string>('');

  const updateMyJob = ({ job }: { job: string }) => {
    setMyJob(job);
  };

  const updateIsNight = (isNight: boolean) => setIsNight(isNight);

  const gameOver = (gameResult: PlayerResult[]) =>
    history.push({
      pathname: '/game-result',
      state: { playerResultList: gameResult },
    });

  const jobEvent: Event = { event: EVENT.PUBLISH_JOB, handler: updateMyJob };
  const gameOverEvent: Event = { event: EVENT.GAME_OVER, handler: gameOver };
  useSocketEvent(socketRef, [jobEvent, gameOverEvent]);

  const turnEvent: Event = { event: EVENT.TURN_CHANGE, handler: updateIsNight };
  useSocketEvent(socketRef, [turnEvent]);

  return { myJob, isNight };
};

export default useGame;
