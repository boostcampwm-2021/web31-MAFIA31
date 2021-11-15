import * as EVENT from '@mafia/domain/constants/event';
import { MafiaPick } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useState } from 'react';

const jobAbility: Record<string, string> = {
  mafia: EVENT.MAFIA_ABILITY,
};

const useAbility = (job: string, setPlayerStateList: any) => {
  const { userInfo } = useUserInfo();
  const { socketRef } = useSocketContext();
  const [mafiaPickList, setMafiaPickList] = useState<MafiaPick[]>([]);

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, (v: string) => {
      setPlayerStateList((prev: any) => [...prev, { userName: v, isDead: true }]);
    });
    socketRef.current?.on(jobAbility[job], (newList: MafiaPick[]) => {
      // 마피아가 선택한 사람을 어빌리티 버튼에 재렌더링
      setMafiaPickList(newList);
    });
    return () => {
      socketRef.current?.off(EVENT.PUBLISH_VICTIM);
      socketRef.current?.off(jobAbility[job]);
    };
  }, [socketRef.current]);

  const emitAbility = (victim: string) => {
    socketRef.current?.emit(jobAbility[job], { mafia: userInfo?.userName, victim });
  };

  return { emitAbility, mafiaPickList };
};

export default useAbility;
