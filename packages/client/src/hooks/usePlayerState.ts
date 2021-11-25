import * as EVENT from '@mafia/domain/constants/event';
import { PlayerState } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { Memo } from '@src/types';
import { useLayoutEffect, useState } from 'react';

const usePlayerState = () => {
  const { socketRef } = useSocketContext();
  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>([]);
  const [memoList, setMemoList] = useState<Memo[]>([]);

  const initMemo = (userList: User[]) => {
    setMemoList(userList.map(({ userName }) => ({ userName, guessJob: 'question' })));
  };

  const updateMemo = (userName: string, job: string) => {
    setMemoList((prev) =>
      prev.map((user) => (user.userName === userName ? { ...user, guessJob: job } : user)),
    );
  };

  const initPlayerState = (userList: User[]) => {
    const initPlayerStateList = userList.map(({ userName }) => ({
      userName,
      isDead: false,
      isMafia: false,
    }));
    setPlayerStateList(initPlayerStateList);
  };

  const updatePlayerDead = ({ userName }: { userName: string }) => {
    setPlayerStateList((prev) =>
      prev.map((player) => (player.userName === userName ? { ...player, isDead: true } : player)),
    );
  };

  const updateMafiaMemo = (mafiaList: string[]) => {
    mafiaList.map((userName) => updateMemo(userName, 'mafia'));
  };

  const updateMafiaState = (mafiaList: string[]) => {
    setPlayerStateList((prev) =>
      prev.map((player) =>
        mafiaList.includes(player.userName) ? { ...player, isMafia: true } : player,
      ),
    );
  };

  const updateMafiaTeam = ({ mafiaList }: { mafiaList: string[] }) => {
    if (!mafiaList) return;
    updateMafiaMemo(mafiaList);
    updateMafiaState(mafiaList);
  };

  useLayoutEffect(() => {
    socketRef.current?.on(EVENT.EXIT, updatePlayerDead);
    socketRef.current?.on(EVENT.EXECUTION, updatePlayerDead);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updatePlayerDead);
    socketRef.current?.on(EVENT.NOTICE_MAFIA, updateMafiaTeam);

    return () => {
      socketRef.current?.off(EVENT.EXIT, updatePlayerDead);
      socketRef.current?.off(EVENT.EXECUTION, updatePlayerDead);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, updatePlayerDead);
      socketRef.current?.off(EVENT.NOTICE_MAFIA, updateMafiaTeam);
    };
  }, [socketRef.current]);

  return { playerStateList, memoList, initPlayerState, initMemo, updateMemo };
};

export default usePlayerState;
