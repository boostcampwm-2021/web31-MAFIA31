import * as EVENT from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useRoom = () => {
  const { socketRef } = useSocketContext();
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);
  const { userInfo } = useUserInfo();
  const history = useHistory();

  const updatePlayerList = (playerList: PlayerInfo[]) => setPlayerList(playerList);
  const pushGamePage = () => history.push('/game');

  useEffect(() => {
    socketRef.current?.on(EVENT.JOIN, updatePlayerList);
    socketRef.current?.on(EVENT.PUBLISH_READY, updatePlayerList);
    socketRef.current?.on(EVENT.PUBLISH_GAME_START, pushGamePage);

    return () => {
      socketRef.current?.off(EVENT.JOIN);
      socketRef.current?.off(EVENT.PUBLISH_READY);
      socketRef.current?.off(EVENT.PUBLISH_GAME_START);
    };
  }, [socketRef.current]);

  const isAllReady = () => !playerList.some(({ isReady }) => !isReady);
  const sendReady = () => socketRef.current?.emit(EVENT.READY, { userName: userInfo?.userName });
  const sendGameStart = () => {
    if (!isAllReady()) return;
    socketRef.current?.emit(EVENT.GAME_START);
  };

  return { playerList, sendReady, sendGameStart, isAllReady };
};

export default useRoom;
