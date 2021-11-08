import { EXECUTION } from 'domain/constants/event';
import { PlayerState, User } from 'domain/types/user';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001';

const useExecute = (roomId: string) => {
  const [playerState, setPlayerList] = useState<PlayerState[]>([
    { userName: 'user1', isDead: true },
    { userName: 'user2', isDead: false },
    { userName: 'user3', isDead: true },
  ]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on(EXECUTION, (user: User) => {
      setPlayerList((prev) =>
        prev.map((player) =>
          player.userName === user.userName ? { ...player, isDead: true } : player,
        ),
      );
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  return playerState;
};

export default useExecute;
