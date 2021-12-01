import useTimer from '@hooks/useTimer';
import * as EVENT from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import * as TOAST from '@src/constants/toast';
import { useSocketContext } from '@src/contexts/socket';
import { Event } from '@src/types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useSocketEvent from './useSocketEvent';

const useToast = (isNight: boolean) => {
  const { socketRef } = useSocketContext();
  const { seconds: voteSec, updateTimer: updateVoteTimer } = useTimer();

  const voteTimeEvent: Event = { event: EVENT.VOTE_TIME, handler: updateVoteTimer };
  useSocketEvent(socketRef, [voteTimeEvent]);

  const viewToast = (condition: any) => {
    const NIGHT = true;
    const DAY = false;

    const toastOp = ((): [string, any?] | undefined => {
      switch (condition) {
        case TIME.VOTE:
          return [TOAST.VOTE_START];
        case TIME.VOTE_END:
          return [TOAST.VOTE_END];
        case TIME.VOTE_ALARM:
          return [
            TOAST.VOTE_ALARM,
            {
              autoClose: TIME.VOTE_ALARM * TIME.SEC,
              hideProgressBar: false,
            },
          ];
        case NIGHT:
          return [TOAST.NIGHT, { theme: 'dark' }];
        case DAY:
          return [TOAST.DAY, { theme: 'light' }];
        default:
          return undefined;
      }
    })();

    if (toastOp === undefined) return;
    toast(...toastOp);
  };

  useEffect(() => {
    viewToast(isNight);
  }, [isNight]);

  useEffect(() => {
    viewToast(voteSec.current);
  }, [voteSec.current]);
};

export default useToast;
