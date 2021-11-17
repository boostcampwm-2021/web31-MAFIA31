import * as EVENT from '@mafia/domain/constants/event';
import { PlayerState } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const usePlayerState = () => {
  const { socketRef } = useSocketContext();
  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>([]);
  const updatePlayerState = (userName: string) => {
    setPlayerStateList((prev) =>
      prev.map((player) => (player.userName === userName ? { ...player, isDead: true } : player)),
    );
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.EXECUTION, updatePlayerState);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updatePlayerState);

    return () => {
      socketRef.current?.off(EVENT.EXECUTION, updatePlayerState);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, updatePlayerState);
    };
  }, [socketRef.current]);

  return { playerStateList, setPlayerStateList };
};

export default usePlayerState;
