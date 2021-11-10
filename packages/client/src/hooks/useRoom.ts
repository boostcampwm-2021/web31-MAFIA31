import { WaitingInfo } from '@src/types';
import { useEffect, useState } from 'react';

const useRoom = (socketRef: any) => {
  const [waitingUserList, setWaitingUserList] = useState<WaitingInfo[]>([
    { userName: 'user1', isHost: true, isReady: true },
    { userName: 'user2', isHost: false, isReady: true },
    { userName: 'user3', isHost: false, isReady: false },
    { userName: 'user4', isHost: false, isReady: true },
    { userName: 'user5', isHost: false, isReady: true },
    { userName: 'user6', isHost: false, isReady: false },
    { userName: 'user7', isHost: false, isReady: false },
    { userName: 'user8', isHost: false, isReady: true },
    { userName: 'user9', isHost: false, isReady: true },
    { userName: 'user10', isHost: false, isReady: true },
    { userName: 'user11', isHost: false, isReady: true },
    { userName: 'user12', isHost: false, isReady: false },
  ]);

  useEffect(() => {
    socketRef.current?.on();

    return () => {};
  }, [socketRef.current]);

  return [waitingUserList, setWaitingUserList];
};

export default useRoom;
