import * as EVENT from '@mafia/domain/constants/event';
import { PlayerState } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const usePlayerState = (initialValue: PlayerState[]) => {
  const { socketRef } = useSocketContext();
  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>(initialValue);
  const updatePlayerDead = ({ userName }: { userName: string }) => {
    setPlayerStateList((prev) =>
      prev.map((player) => (player.userName === userName ? { ...player, isDead: true } : player)),
    );
  };

  const updatePlayerMafia = ({ mafiaList }: { mafiaList: string[] }) => {
    if (!mafiaList) return;
    setPlayerStateList((prev) =>
      prev.map((player) =>
        mafiaList.includes(player.userName) ? { ...player, isMafia: true } : player,
      ),
    );
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.EXIT, updatePlayerDead);
    socketRef.current?.on(EVENT.EXECUTION, updatePlayerDead);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updatePlayerDead);
    socketRef.current?.on(EVENT.NOTICE_MAFIA, updatePlayerMafia);

    return () => {
      socketRef.current?.off(EVENT.EXIT, updatePlayerDead);
      socketRef.current?.off(EVENT.EXECUTION, updatePlayerDead);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, updatePlayerDead);
      socketRef.current?.off(EVENT.NOTICE_MAFIA, updatePlayerMafia);
    };
  }, [socketRef.current]);

  return { playerStateList };
};

export default usePlayerState;
