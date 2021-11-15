import * as EVENT from '@mafia/domain/constants/event';
import { User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001/';

  const joinRoom = (): object | User => {
    if (!userInfo) return {};

    const { userName, profileImg } = userInfo;
    return { userName, profileImg };
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL + roomId);
    socketRef.current?.emit(EVENT.JOIN, joinRoom());
  }, [roomId]);
};

export default useSocket;
