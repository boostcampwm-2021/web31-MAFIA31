import * as EVENT from '@mafia/domain/constants/event';
import { User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { Event, Memo } from '@src/types';
import { useEffect, useState } from 'react';
import useSocketEvent from './useSocketEvent';

const useJobMemo = (initValue: User[]) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const [jobMemos, setJobMemos] = useState<Memo[]>([]);

  const updateJobMemos = (playerName: string, job: string) => {
    setJobMemos((prev) =>
      prev.map((user) => (user.userName === playerName ? { ...user, guessJob: job } : user)),
    );
  };

  const updateJob = ({ job }: { job: string }) => {
    updateJobMemos(userInfo?.userName ?? '', job);
  };

  const updateMafias = ({ mafiaList: mafias }: { mafiaList: string[] }) => {
    if (!mafias) return;
    mafias.forEach((mafia) => updateJobMemos(mafia, 'mafia'));
  };

  const myJobMemoEvent: Event = { event: EVENT.PUBLISH_JOB, handler: updateJob };
  const mafiaMemoEvent: Event = { event: EVENT.NOTICE_MAFIA, handler: updateMafias };
  useSocketEvent(socketRef, [myJobMemoEvent, mafiaMemoEvent]);

  const initMemo = () => {
    const newMemos = initValue.map(({ userName }) => ({ userName, guessJob: 'question' }));
    setJobMemos(newMemos);
  };

  useEffect(() => {
    initMemo();
  }, []);

  return { jobMemos, updateJobMemos };
};

export default useJobMemo;
