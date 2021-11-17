import * as EVENT from '@mafia/domain/constants/event';
import { MafiaPick, PoliceInvestigation } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useState } from 'react';

const useAbility = (job: string, setPlayerStateList: any) => {
  const { userInfo } = useUserInfo();
  const { socketRef } = useSocketContext();
  const [mafiaPickList, setMafiaPickList] = useState<MafiaPick[]>([]);

  useEffect(() => {
    if (job === 'mafia') {
      socketRef.current?.on(EVENT.PUBLISH_VICTIM, (userName: string) => {
        setPlayerStateList((prev: any) => [...prev, { userName, isDead: true }]);
      });
      socketRef.current?.on(EVENT.MAFIA_ABILITY, (newList: MafiaPick[]) => {
        // 마피아가 선택한 사람을 어빌리티 버튼에 재렌더링
        setMafiaPickList(newList);
      });
    } else if (job === 'police') {
      socketRef.current?.on(
        EVENT.POLICE_INVESTIGATION,
        ({ userName, isMafia }: PoliceInvestigation) => {
          console.log(userName, isMafia);
        },
      );
    }

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_VICTIM);
      socketRef.current?.off(EVENT.MAFIA_ABILITY);
      socketRef.current?.off(EVENT.POLICE_INVESTIGATION);
    };
  }, [socketRef.current, job]);

  const emitAbility = (userName: string) => {
    if (job === 'mafia') {
      socketRef.current?.emit(EVENT.MAFIA_ABILITY, { mafia: userInfo?.userName, victim: userName });
    } else if (job === 'police') {
      socketRef.current?.emit(EVENT.POLICE_INVESTIGATION, userName);
    }
  };

  return { emitAbility, mafiaPickList };
};

export default useAbility;
