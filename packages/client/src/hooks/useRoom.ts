import * as EVENT from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    socketRef.current?.on(EVENT.JOIN, (playerList: PlayerInfo[]) => {
      setPlayerList(playerList);
    });
    socketRef.current?.on(EVENT.PUBLISH_READY, updatePlayerList);

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_READY);
      socketRef.current?.off(EVENT.JOIN);
    };
  }, [socketRef.current]);

  const updatePlayerList = (playerList: PlayerInfo[]) => setPlayerList(playerList);
  const sendReady = ({ userName }: { userName: string }) =>
    socketRef.current?.emit(EVENT.READY, userName);
  const sendGameStart = () => socketRef.current?.emit(EVENT.GAME_START);

  return { playerList, sendReady, sendGameStart };
};

export default useRoom;
