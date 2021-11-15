import {
  GAME_START,
  PUBLISH_JOIN,
  PUBLISH_LEAVE,
  PUBLISH_READY,
  READY,
} from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);
  const { userInfo } = useUserInfo();

  const updatePlayerList = (playerList: PlayerInfo[]) => setPlayerList(playerList);

  useEffect(() => {
    socketRef.current?.on(PUBLISH_JOIN, updatePlayerList);
    socketRef.current?.on(PUBLISH_READY, updatePlayerList);
    socketRef.current?.on(PUBLISH_LEAVE, updatePlayerList);

    return () => {
      socketRef.current?.off(PUBLISH_READY, updatePlayerList);
      socketRef.current?.off(PUBLISH_JOIN, updatePlayerList);
      socketRef.current?.off(PUBLISH_LEAVE, updatePlayerList);
    };
  }, [socketRef.current]);

  const sendReady = () => socketRef.current?.emit(READY, userInfo?.userName);
  const sendGameStart = () => socketRef.current?.emit(GAME_START);

  return { playerList, sendReady, sendGameStart };
};

export default useRoom;
