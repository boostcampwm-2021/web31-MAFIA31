import { EXECUTION } from '@mafia/domain/constants/event';
import { PlayerState } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { useEffect, useState } from 'react';

const useExecute = (socketRef: any) => {
  const [playerState, setPlayerList] = useState<PlayerState[]>([]);
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
