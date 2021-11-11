import { GAME_START, PUBLISH_READY, READY } from '@mafia/domain/constants/event';
import { PlayerInfo, WaitingInfo } from '@mafia/domain/types/user';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [waitingUserList, setWaitingUserList] = useState<WaitingInfo[]>([
    { userName: 'user1', isHost: false, isReady: true },
    { userName: 'user2', isHost: false, isReady: true },
    { userName: 'user3', isHost: false, isReady: true },
    { userName: 'user4', isHost: true, isReady: true },
    { userName: 'user5', isHost: false, isReady: true },
    { userName: 'binimini', isHost: false, isReady: true },
    { userName: 'user7', isHost: false, isReady: true },
    { userName: 'user8', isHost: false, isReady: true },
    { userName: 'user9', isHost: false, isReady: true },
    { userName: 'user10', isHost: false, isReady: true },
    { userName: 'user11', isHost: false, isReady: true },
    { userName: 'user12', isHost: false, isReady: true },
  ]);

  useEffect(() => {
    socketRef.current?.on(PUBLISH_READY, updateWaitingUserList);

    return () => {
      socketRef.current?.off(PUBLISH_READY);
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
