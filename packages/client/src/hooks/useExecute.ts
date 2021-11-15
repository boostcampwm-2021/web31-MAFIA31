import { EXECUTION } from '@mafia/domain/constants/event';
import { PlayerState } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useExecute = () => {
  const { socketRef } = useSocketContext();
  const [playerState, setPlayerList] = useState<PlayerState[]>([
    { userName: 'user1', isDead: true },
    { userName: 'user2', isDead: false },
    { userName: 'user3', isDead: true },
    { userName: 'user4', isDead: false },
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
      socketRef.current?.off(EXECUTION, updatePlayerState);
    };
  }, [socketRef.current]);

  return playerState;
};

export default useExecute;
