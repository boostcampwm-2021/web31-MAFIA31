import { MAFIA_ABILITY } from '@mafia/domain/constants/event';
import { MafiaPick } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const jobAbility: Record<string, string> = {
  mafia: MAFIA_ABILITY,
};

const useAbility = (myUserName: string, job: string) => {
  const { socketRef } = useSocketContext();
  const [mafiaPickList, setMafiaPickList] = useState<MafiaPick[]>([]);

  useEffect(() => {
    socketRef.current?.on(jobAbility[job], (newList: MafiaPick[]) => {
      // 마피아가 선택한 사람을 어빌리티 버튼에 재렌더링
      setMafiaPickList(newList);
    });
    return () => {
      socketRef.current?.off(jobAbility[job]);
    };
  }, [socketRef.current]);

  const emitAbility = (victim: string) => {
    const socketId = socketRef.current?.id;
    if (socketId) {
      socketRef.current?.emit(jobAbility[job], { mafia: myUserName, victim, socketId });
    }
  };

  return { emitAbility, mafiaPickList };
};

export default useAbility;
