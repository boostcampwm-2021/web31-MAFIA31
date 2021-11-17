import * as EVENT from '@mafia/domain/constants/event';
import { PoliceInvestigation } from '@mafia/domain/types/game';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useAbility = (job: string) => {
  const { socketRef } = useSocketContext();
  const [victim, setVictim] = useState('');

  useEffect(() => {
    if (job === 'mafia') {
      socketRef.current?.on(EVENT.PUBLISH_VICTIM, () => setVictim(''));

      socketRef.current?.on(EVENT.MAFIA_ABILITY, (victim: string) => {
        setVictim(victim);
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
      socketRef.current?.emit(EVENT.MAFIA_ABILITY, userName);
    } else if (job === 'police') {
      socketRef.current?.emit(EVENT.POLICE_INVESTIGATION, userName);
    }
  };

  return { emitAbility, victim };
};

export default useAbility;
