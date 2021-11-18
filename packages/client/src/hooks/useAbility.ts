import * as EVENT from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useAbility = (job: string) => {
  const { socketRef } = useSocketContext();
  const [victim, setVictim] = useState('');
  const resetVictim = () => setVictim('');
  const setNewVictim = (victim: string) => setVictim(victim);

  useEffect(() => {
    if (job === 'mafia') {
      socketRef.current?.on(EVENT.PUBLISH_VICTIM, resetVictim);

      socketRef.current?.on(EVENT.MAFIA_ABILITY, setNewVictim);
    }

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, resetVictim);
      socketRef.current?.off(EVENT.MAFIA_ABILITY, setNewVictim);
    };
  }, [socketRef.current, job]);

  const emitAbility = (userName: string) => {
    if (job === 'mafia') {
      socketRef.current?.emit(EVENT.MAFIA_ABILITY, userName);
    } else if (job === 'police') {
      socketRef.current?.emit(EVENT.POLICE_ABILITY, userName);
    } else if (job === 'doctor') {
      socketRef.current?.emit(EVENT.DOCTOR_ABILITY, userName);
    }
  };

  return { emitAbility, victim };
};

export default useAbility;
