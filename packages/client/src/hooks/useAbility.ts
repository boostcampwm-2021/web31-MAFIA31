import * as EVENT from '@mafia/domain/constants/event';
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
    }

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_VICTIM);
      socketRef.current?.off(EVENT.MAFIA_ABILITY);
    };
  }, [socketRef.current, job]);

  const emitAbility = (userName: string) => {
    if (job === 'mafia') {
      socketRef.current?.emit(EVENT.MAFIA_ABILITY, userName);
    } else if (job === 'police') {
      socketRef.current?.emit(EVENT.POLICE_INVESTIGATION, userName);
    } else if (job === 'doctor') {
      socketRef.current?.emit(EVENT.DOCTOR_ABILITY, userName);
    }
  };

  return { emitAbility, victim };
};

export default useAbility;
