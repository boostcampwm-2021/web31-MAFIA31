import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../../../domain/types/user';

const EXECUTION = 'execution';
const SOCKET_SERVER_URL = 'localhost:5001/';

const useExecute = (roomId: string) => {
  const [playerState] = useState({
    user1: true,
    user2: false,
    user3: true,
  });
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(EXECUTION, (user: User) => user.userName);

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  return playerState;
};

export default useExecute;
