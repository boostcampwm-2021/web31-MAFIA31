import { useEffect, useState } from 'react';
import { PlayerState, User } from '../../../domain/types/user';

const EXECUTION = 'execution';

const useExecute = (socketRef: any) => {
  const [playerState, setPlayerList] = useState<PlayerState[]>([
    { userName: 'user1', isDead: true },
    { userName: 'user2', isDead: false },
    { userName: 'user3', isDead: true },
  ]);
  const updatePlayerState = (user: User) => {
    setPlayerList((prev) =>
      prev.map((player) =>
        player.userName === user.userName ? { ...player, isDead: true } : player,
      ),
    );
  };

  useEffect(() => {
    socketRef.current?.on(EXECUTION, updatePlayerState);

    return () => {
      socketRef.current.off(EXECUTION, updatePlayerState);
    };
  }, [socketRef.current]);

  return playerState;
};

export default useExecute;
