import * as EVENT from '@mafia/domain/constants/event';
import { MafiaPick } from '@mafia/domain/types/game';
import { useEffect, useState } from 'react';

const jobAbility: Record<string, string> = {
  mafia: EVENT.MAFIA_ABILITY,
};

const useAbility = (socketRef: any, myUserName: string, job: string, setPlayerStateList: any) => {
  const [mafiaPickList, setMafiaPickList] = useState<MafiaPick[]>([]);

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, (v: string) => {
      setPlayerStateList((prev: any) => [...prev, { userName: v, isDead: true }]);
    });
    return () => {
      socketRef.current.off(EVENT.PUBLISH_VICTIM);
    };
  }, [socketRef.current]);

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
    socketRef.current?.emit(jobAbility[job], { mafia: myUserName, victim });
  };

  return { emitAbility, mafiaPickList };
};

export default useAbility;
