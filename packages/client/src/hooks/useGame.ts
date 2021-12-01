import useTimer from '@hooks/useTimer';
import * as EVENT from '@mafia/domain/constants/event';
import { PlayerResult } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { RoomVote } from '@mafia/domain/types/vote';
import { useSocketContext } from '@src/contexts/socket';
import { Event, Player } from '@src/types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSocketEvent from './useSocketEvent';

const useGame = (initValue: User[]) => {
  const history = useHistory();
  const { socketRef } = useSocketContext();
  const [isNight, setIsNight] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [mafias, setMafias] = useState<string[]>([]);
  const [myJob, setMyJob] = useState<string>('');
  const { seconds: voteSec, updateTimer: updateVoteTimer } = useTimer();

  const updateMyJob = ({ job }: { job: string }) => {
    setMyJob(job);
  };

  const updateMafias = ({ mafiaList: mafias }: { mafiaList: string[] }) => {
    if (!mafias) return;
    setMafias(mafias);
  };

  const updatePlayerDead = (playerName: string) => {
    setPlayers((players) =>
      players.map((player) =>
        player.userName === playerName ? { ...player, isDead: true } : player,
      ),
    );
  };

  const updatePlayerVote = (roomVotes: RoomVote) => {
    setPlayers((prev) =>
      prev.map((player) => {
        const voteCount = roomVotes[player.userName];
        return voteCount !== undefined ? { ...player, voteCount } : player;
      }),
    );
  };

  const updateIsNight = (isNight: boolean) => setIsNight(isNight);

  const gameOver = (gameResult: PlayerResult[]) =>
    history.push({
      pathname: '/game-result',
      state: { playerResultList: gameResult },
    });

  const jobEvent: Event = { event: EVENT.PUBLISH_JOB, handler: updateMyJob };
  const noticeMafiaEvent: Event = { event: EVENT.NOTICE_MAFIA, handler: updateMafias };
  const gameOverEvent: Event = { event: EVENT.GAME_OVER, handler: gameOver };
  useSocketEvent(socketRef, [jobEvent, noticeMafiaEvent, gameOverEvent]);

  const executionEvent: Event = { event: EVENT.EXECUTION, handler: updatePlayerDead };
  const killEvent: Event = { event: EVENT.PUBLISH_VICTIM, handler: updatePlayerDead };
  const voteEvent: Event = { event: EVENT.PUBLISH_VOTE, handler: updatePlayerVote };
  const exitEvent: Event = { event: EVENT.EXIT, handler: updatePlayerDead };
  useSocketEvent(socketRef, [executionEvent, killEvent, voteEvent, exitEvent]);

  const turnEvent: Event = { event: EVENT.TURN_CHANGE, handler: updateIsNight };
  const voteTimeEvent: Event = { event: EVENT.VOTE_TIME, handler: updateVoteTimer };
  useSocketEvent(socketRef, [turnEvent, voteTimeEvent]);

  const initPlayers = () => {
    const newPlayers: Player[] = initValue.map((user: User) => ({
      ...user,
      isDead: false,
      voteCount: 0,
    }));
    setPlayers(newPlayers);
  };

  useEffect(() => {
    initPlayers();
  }, []);

  return { players, myJob, mafias, isNight, voteSec };
};

export default useGame;
