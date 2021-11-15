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
import { useHistory } from 'react-router-dom';

const useRoom = (socketRef: any) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);
  const { userInfo } = useUserInfo();
  const history = useHistory();

  const updatePlayerList = (playerList: PlayerInfo[]) => setPlayerList(playerList);
  const pushGamePage = () => history.push('/game');

  useEffect(() => {
    socketRef.current?.on(PUBLISH_JOIN, updatePlayerList);
    socketRef.current?.on(PUBLISH_READY, updatePlayerList);
    socketRef.current?.on(PUBLISH_LEAVE, updatePlayerList);
    socketRef.current?.on(GAME_START, pushGamePage);

    return () => {
      socketRef.current?.off(PUBLISH_READY, updatePlayerList);
      socketRef.current?.off(PUBLISH_JOIN, updatePlayerList);
      socketRef.current?.off(PUBLISH_LEAVE, updatePlayerList);
      socketRef.current?.off(GAME_START, pushGamePage);
    };
  }, [socketRef.current]);

  const isAllReady = () => !playerList.some(({ isReady }) => !isReady);
  const sendReady = () => socketRef.current?.emit(READY, { userName: userInfo?.userName });
  const sendGameStart = () => {
    if (!isAllReady()) return;
    socketRef.current?.emit(GAME_START);
  };

  return { playerList, sendReady, sendGameStart, isAllReady };
};

export default useRoom;
