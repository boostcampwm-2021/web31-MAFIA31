import { BULLET_MP3, HEAL_MP3, SURVEY_MP3, VOTE_MP3 } from '@constants/audio';
import * as EVENT from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { Event, Selected } from '@src/types';
import { MutableRefObject, useEffect, useState } from 'react';
import useAudio from './useAudio';
import useSocketEvent from './useSocketEvent';

const useAbility = (
  isNight: boolean,
  voteSec: MutableRefObject<number | undefined>,
  job: string,
) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const [selected, setSelected] = useState<Selected>({ candidate: '' });
  const { updateAudio, load, play } = useAudio();

  const resetSelected = () => {
    setSelected({ candidate: '' });
  };
  const updateVictim = (victim: string) => setSelected({ ...selected, victim });
  const updateSurvivor = (survivor: string) => setSelected({ ...selected, survivor });
  const updateSuspect = (suspect: string) => setSelected({ ...selected, suspect });
  const updateCandidate = (candidate: string) => setSelected({ ...selected, candidate });

  const mafiaEvent: Event = { event: EVENT.MAFIA_ABILITY, handler: updateVictim };
  const policeEvent: Event = { event: EVENT.POLICE_ABILITY, handler: updateSuspect };
  const doctorEvent: Event = { event: EVENT.DOCTOR_ABILITY, handler: updateSurvivor };
  useSocketEvent(socketRef, [mafiaEvent, policeEvent, doctorEvent]);

  const isVoteTime = () =>
    !isNight && voteSec.current !== TIME.VOTE_END && voteSec.current !== undefined;

  const voteUser = (to: string): void => {
    socketRef.current?.emit(EVENT.VOTE, { from: userInfo?.userName, to });
  };

  const emitAbility = (userName: string, isDead: boolean) => {
    if (isDead) return;

    if (isVoteTime()) {
      play();
      updateCandidate(userName);
      voteUser(userName);
      return;
    }

    if (isNight) {
      const eventName = (() => {
        switch (job) {
          case 'mafia':
            return EVENT.MAFIA_ABILITY;
          case 'police':
            if (!selected.suspect) {
              return EVENT.POLICE_ABILITY;
            }
            return '';
          case 'doctor':
            return EVENT.DOCTOR_ABILITY;
          default:
            return '';
        }
      })();
      if (!eventName) return;
      play();
      socketRef.current?.emit(eventName, userName);
    }
  };

  const getSelectedImg = (userName: string, isDead: boolean) => {
    if (isDead) return '';

    const selectedUser = (() => {
      if (!isNight) return selected.candidate;
      switch (job) {
        case 'mafia':
          return selected.victim;
        case 'police':
          return selected.suspect;
        case 'doctor':
          return selected.survivor;
        default:
          return undefined;
      }
    })();
    if (selectedUser !== userName) return '';

    const imageSrc = (() => {
      if (!isNight) return 'check';
      switch (job) {
        case 'mafia':
          return 'bullet';
        case 'police':
          return 'search';
        case 'doctor':
          return 'heal';
        default:
          return '';
      }
    })();
    return imageSrc;
  };

  const updateSoundEffect = () => {
    const soundeEffect = (() => {
      if (!isNight) return VOTE_MP3;
      switch (job) {
        case 'mafia':
          return BULLET_MP3;
        case 'police':
          return SURVEY_MP3;
        case 'doctor':
          return HEAL_MP3;
        default:
          return VOTE_MP3;
      }
    })();

    updateAudio(soundeEffect);
    load();
  };

  useEffect(() => {
    resetSelected();
    updateSoundEffect();
  }, [isNight]);

  return { selected, emitAbility, getSelectedImg };
};

export default useAbility;
