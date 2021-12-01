import * as EVENT from '@mafia/domain/constants/event';
import { PlayerInfo, User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { Event } from '@src/types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useSocketEvent from './useSocketEvent';

const useRoom = (roomName: string) => {
  const history = useHistory();
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();

  const [isHost, setIsHost] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  const updatePlayers = (newPlayerList: PlayerInfo[]) => setPlayers(newPlayerList);
  const startGame = () => {
    history.push({
      pathname: '/game',
      state: {
        roomName,
        players: players.map(({ userName, profileImg }: User) => ({ userName, profileImg })),
      },
    });
  };

  const joinEvent: Event = { event: EVENT.JOIN, handler: updatePlayers };
  const readyEvent: Event = { event: EVENT.PUBLISH_READY, handler: updatePlayers };
  const startEvent: Event = { event: EVENT.PUBLISH_GAME_START, handler: startGame };
  useSocketEvent(socketRef, [joinEvent, readyEvent]);
  useSocketEvent(socketRef, [startEvent], [players]);

  const isAllReady = () => !players.some(({ isReady }) => !isReady);
  const sendReady = () => socketRef.current?.emit(EVENT.READY, { userName: userInfo?.userName });
  const sendStart = () => {
    if (!isAllReady()) return;
    socketRef.current?.emit(EVENT.GAME_START);
  };

  const updateHost = () => {
    if (!players[0]) {
      setIsHost(false);
      return;
    }
    setIsHost(players[0].isHost && userInfo?.userName === players[0].userName);
  };

  useEffect(() => {
    updateHost();
  }, [players, userInfo?.userName]);

  return { players, isHost, sendReady, sendStart, isAllReady };
};

export default useRoom;
