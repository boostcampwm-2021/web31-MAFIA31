import * as EVENT from '@mafia/domain/constants/event';
import { User } from '@mafia/domain/types/user';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { Event, JobMemo } from '@src/types';
import { useEffect, useState } from 'react';
import useSocketEvent from './useSocketEvent';

const useJobMemo = (initValue: User[]) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const [jobMemos, setJobMemos] = useState<JobMemo[]>([]);

  const updateJobMemos = (playerName: string, job: string) => {
    setJobMemos((prev) =>
      prev.map((user) => (user.userName === playerName ? { ...user, guessJob: job } : user)),
    );
  };

  const updateDeadStatus = (playerName: string) => {
    setJobMemos((prev) =>
      prev.map((user) => (user.userName === playerName ? { ...user, isDead: true } : user)),
    );
  };

  const updateJob = ({ job }: { job: string }) => {
    updateJobMemos(userInfo?.userName ?? '', job);
  };

  const updateMafias = ({ mafiaList: mafias }: { mafiaList: string[] }) => {
    if (!mafias) return;
    mafias.forEach((mafia) => updateJobMemos(mafia, 'mafia'));
  };

  const updatePlayerDead = (playerName: string) => {
    updateDeadStatus(playerName);
  };

  const myJobMemoEvent: Event = { event: EVENT.PUBLISH_JOB, handler: updateJob };
  const mafiaMemoEvent: Event = { event: EVENT.NOTICE_MAFIA, handler: updateMafias };
  useSocketEvent(socketRef, [myJobMemoEvent, mafiaMemoEvent]);

  const executionEvent: Event = { event: EVENT.EXECUTION, handler: updatePlayerDead };
  const killEvent: Event = { event: EVENT.PUBLISH_VICTIM, handler: updatePlayerDead };
  const exitEvent: Event = { event: EVENT.EXIT, handler: updatePlayerDead };
  useSocketEvent(socketRef, [executionEvent, killEvent, exitEvent]);

  const initMemo = () => {
    const newMemos = initValue.map(({ userName }) => ({
      userName,
      guessJob: 'question',
      isDead: false,
    }));
    setJobMemos(newMemos);
  };

  useEffect(() => {
    initMemo();
  }, []);

  return { jobMemos, updateJobMemos };
};

export default useJobMemo;
