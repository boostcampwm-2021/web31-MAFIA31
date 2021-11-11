import { GAME_START, PUBLISH_READY, READY } from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [playerList, setWaitingUserList] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    socketRef.current?.on('join', (playerList: PlayerInfo[]) => {
      setWaitingUserList(playerList);
    });
    socketRef.current?.on(PUBLISH_READY, updateWaitingUserList);

    return () => {
      socketRef.current?.off(PUBLISH_READY);
      socketRef.current?.off('join');
    };
  }, [socketRef.current]);

  const updateWaitingUserList = (playerList: PlayerInfo[]) => setWaitingUserList(playerList);
  const sendReady = ({ userName }: { userName: string }) =>
    socketRef.current?.emit(READY, userName);
  const sendGameStart = () => socketRef.current?.emit(GAME_START);

  return { playerList, sendReady, sendGameStart };
};

export default useRoom;
