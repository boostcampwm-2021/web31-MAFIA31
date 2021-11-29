import * as EVENT from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001/';

  const joinRoom = () => {
    if (!userInfo) return;

    socketRef.current = io(SOCKET_URL + roomId);
    socketRef.current?.emit(EVENT.JOIN, userInfo);
  };

  useEffect(() => {
    joinRoom();
  }, [roomId]);
};

export default useSocket;
