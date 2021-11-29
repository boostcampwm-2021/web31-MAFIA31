import * as TIME from '@mafia/domain/constants/time';
import * as TOAST from '@src/constants/toast';
import { MutableRefObject, useEffect } from 'react';
import { toast } from 'react-toastify';

const useToast = (isNight: boolean, voteSec: MutableRefObject<number | undefined>) => {
  const viewToast = (condition: any) => {
    const NIGHT = true;
    const DAY = false;

    const toastOp = ((): [string | JSX.Element, any?] | undefined => {
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

  useEffect(() => {}, []);

  useEffect(() => {
    viewToast(isNight);
  }, [isNight]);

  useEffect(() => {
    viewToast(voteSec.current);
  }, [voteSec.current]);
};

export default useToast;
