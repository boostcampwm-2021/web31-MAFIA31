import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const socketRef = useRef<Socket>();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001/';
  const { userInfo } = useUserInfo();
  const socketId = socketRef.current?.id;

  useEffect(() => {
    socketRef.current = io(SOCKET_URL + roomId);
    socketRef.current.emit('join', userInfo?.userName);

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  return { socketRef, socketId };
};

export default useSocket;
