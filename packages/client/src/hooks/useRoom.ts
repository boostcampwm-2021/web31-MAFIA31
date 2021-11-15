import { GAME_START, PUBLISH_READY, READY } from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useRoom = () => {
  const { socketRef } = useSocketContext();
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    socketRef.current?.on('join', (playerList: PlayerInfo[]) => {
      setPlayerList(playerList);
    });
    socketRef.current?.on(PUBLISH_READY, updatePlayerList);

    return () => {
      socketRef.current?.off(PUBLISH_READY);
      socketRef.current?.off('join');
    };
  }, [socketRef.current]);

  const updatePlayerList = (playerList: PlayerInfo[]) => setPlayerList(playerList);
  const sendReady = ({ userName }: { userName: string }) =>
    socketRef.current?.emit(READY, userName);
  const sendGameStart = () => socketRef.current?.emit(GAME_START);

  return { playerList, sendReady, sendGameStart };
};

export default useRoom;
