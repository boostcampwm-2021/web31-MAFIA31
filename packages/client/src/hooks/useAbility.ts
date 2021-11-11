import { MAFIA_ABILITY } from 'domain/constants/event';
import { MafiaPick } from 'domain/types/game';
import { useEffect, useState } from 'react';

const jobAbility: Record<string, string> = {
  mafia: MAFIA_ABILITY,
};

const useAbility = (
  socketRef: any,
  socketId: string | undefined,
  myUserName: string,
  job: string,
) => {
  const [mafiaPickList, setMafiaPickList] = useState<MafiaPick[]>([]);

  useEffect(() => {
    socketRef.current?.on(jobAbility[job], (newList: MafiaPick[]) => {
      // 마피아가 선택한 사람을 어빌리티 버튼에 재렌더링
      setMafiaPickList(newList);
    });
    return () => {
      socketRef.current.off(jobAbility[job]);
    };
  }, [socketRef.current]);

  const emitAbility = (victim: string) => {
    if (socketId) {
      socketRef.current?.emit(jobAbility[job], { mafia: myUserName, victim, socketId });
    }
  };

  return { emitAbility, mafiaPickList };
};

export default useAbility;
