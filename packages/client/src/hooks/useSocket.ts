import { JOIN } from '@mafia/domain/constants/event';
import { User } from '@mafia/domain/types/user';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const socketRef = useRef<Socket>();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001/';
  const { userInfo } = useUserInfo();
  const socketId = socketRef.current?.id;

  const joinRoom = (): object | User => {
    if (!userInfo) return {};

    const { userName, profileImg } = userInfo;
    return { userName, profileImg };
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL + roomId);
    socketRef.current.emit(JOIN, joinRoom());

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  return { socketRef, socketId };
};

export default useSocket;
