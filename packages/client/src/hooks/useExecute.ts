import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../../../domain/types/user';

const EXECUTION = 'execution';
const SOCKET_SERVER_URL = 'localhost:5001/';

interface PlayerStatus {
  userName: string;
  isDead: boolean;
}

const useExecute = (roomId: string) => {
  const [playerStateList, setplayerStateList] = useState<PlayerStatus[]>([
    { userName: 'user1', isDead: true },
    { userName: 'user2', isDead: false },
    { userName: 'user3', isDead: false },
  ]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(EXECUTION, (user: User) => {
      setplayerStateList((prev) =>
        prev.map((player) =>
          player.userName === user.userName ? { userName: player.userName, isDead: true } : player,
        ),
      );

      return () => {
        socketRef.current!.disconnect();
      };
    });
  }, [roomId]);

  return playerStateList;
};

export default useExecute;
