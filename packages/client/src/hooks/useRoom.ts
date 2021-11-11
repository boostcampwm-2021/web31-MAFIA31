import { GAME_START, PUBLISH_READY, READY } from '@mafia/domain/constants/event';
import { PlayerInfo, WaitingInfo } from '@mafia/domain/types/user';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [waitingUserList, setWaitingUserList] = useState<WaitingInfo[]>([]);

  useEffect(() => {
    socketRef.current?.on('join', (data: WaitingInfo[]) => {
      setWaitingUserList(data);
    });
    socketRef.current?.on(PUBLISH_READY, updateWaitingUserList);

    return () => {
      socketRef.current?.off(PUBLISH_READY);
      socketRef.current?.off('join');
    };
  }, [socketRef.current]);

  const updateWaitingUserList = (data: PlayerInfo[]) => {
    const newWaitingUserList: WaitingInfo[] = data.map((user: PlayerInfo) => {
      const { isHost, isReady, userName }: WaitingInfo = user;
      return { isHost, isReady, userName };
    });
    setWaitingUserList(newWaitingUserList);
  };

  const sendReady = (userInfo: WaitingInfo) => socketRef.current?.emit(READY, userInfo);

  const sendGameStart = () => socketRef.current?.emit(GAME_START);

  return { waitingUserList, sendReady, sendGameStart };
};

export default useRoom;
