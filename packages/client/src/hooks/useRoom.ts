import { GAME_START, PUBLISH_READY, READY } from 'domain/constants/event';
import { WaitingInfo } from 'domain/types/user';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [waitingUserList, setWaitingUserList] = useState<WaitingInfo[]>([
    { userName: 'user1', isHost: false, isReady: true },
    { userName: 'user2', isHost: false, isReady: true },
    { userName: 'user3', isHost: false, isReady: true },
    { userName: 'user4', isHost: false, isReady: true },
    { userName: 'user5', isHost: false, isReady: true },
    { userName: 'binimini', isHost: true, isReady: true },
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

  const updateWaitingUserList = ({ userName, isReady }: WaitingInfo) => {
    setWaitingUserList((prev) =>
      prev.map((user) => ({
        ...user,
        isReady: userName === user.userName ? isReady : user.isReady,
      })),
    );
  };

  const sendReady = (userInfo: WaitingInfo) => socketRef.current?.emit(READY, userInfo);

  const sendGameStart = () => socketRef.current?.emit(GAME_START);

  return { waitingUserList, sendReady, sendGameStart };
};

export default useRoom;
