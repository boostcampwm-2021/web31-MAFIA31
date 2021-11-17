import * as EVENT from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const jobAbility: Record<string, string> = {
  mafia: EVENT.MAFIA_ABILITY,
};

const useAbility = (job: string) => {
  const { socketRef } = useSocketContext();
  const [victim, setVictim] = useState('');

  useEffect(() => {
    socketRef.current?.on(jobAbility[job], (victim: string) => {
      setVictim(victim);
    });
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, () => setVictim(''));

    return () => {
      socketRef.current?.off(jobAbility[job]);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM);
    };
  }, [socketRef.current]);

  const emitAbility = (victim: string) => {
    socketRef.current?.emit(jobAbility[job], victim);
  };

  return { emitAbility, victim };
};

export default useAbility;
