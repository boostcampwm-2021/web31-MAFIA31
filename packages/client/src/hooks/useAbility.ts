import { BULLET_MP3, HEAL_MP3, SURVEY_MP3, VOTE_MP3 } from '@constants/audio';
import * as EVENT from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { User } from '@mafia/domain/types/user';
import { RoomVote } from '@mafia/domain/types/vote';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { Event, Player, Selected } from '@src/types';
import { useEffect, useRef, useState } from 'react';
import useAudio from './useAudio';
import useSocketEvent from './useSocketEvent';

const useAbility = (initPlayers: User[], isNight: boolean, job: string) => {
  const { socketRef } = useSocketContext();
  const { userInfo } = useUserInfo();
  const voteSec = useRef<number | undefined>(undefined);
  const [players, setPlayers] = useState<Player[]>([]);
  const [mafias, setMafias] = useState<string[]>([]);
  const [selected, setSelected] = useState<Selected>({ candidate: '' });
  const { updateAudio, load, play } = useAudio();

  const resetSelected = () => {
    setSelected({ candidate: '' });
  };
  const updateVictim = (victim: string) => setSelected((prev) => ({ ...prev, victim }));
  const updateSurvivor = (survivor: string) => setSelected((prev) => ({ ...prev, survivor }));
  const updateSuspect = (suspect: string) => setSelected((prev) => ({ ...prev, suspect }));
  const updateCandidate = (candidate: string) => setSelected((prev) => ({ ...prev, candidate }));
  const updateVoteTimer = (remainTime: number): void => {
    voteSec.current = remainTime;
  };

  const updateMafias = (mafias: string[]) => {
    if (!mafias) return;
    setMafias(mafias);
  };

  const updatePlayerDead = (playerName: string) => {
    setPlayers((players) =>
      players.map((player) =>
        player.userName === playerName ? { ...player, isDead: true } : player,
      ),
    );
  };

  const updatePlayerVote = (roomVotes: RoomVote) => {
    setPlayers((prev) =>
      prev.map((player) => {
        const voteCount = roomVotes[player.userName];
        return voteCount !== player.voteCount ? { ...player, voteCount } : player;
      }),
    );
  };

  const noticeMafiaEvent: Event = { event: EVENT.NOTICE_MAFIA, handler: updateMafias };
  useSocketEvent(socketRef, [noticeMafiaEvent]);

  const mafiaEvent: Event = { event: EVENT.MAFIA_ABILITY, handler: updateVictim };
  const policeEvent: Event = { event: EVENT.POLICE_ABILITY, handler: updateSuspect };
  const doctorEvent: Event = { event: EVENT.DOCTOR_ABILITY, handler: updateSurvivor };
  const voteTimeEvent: Event = { event: EVENT.VOTE_TIME, handler: updateVoteTimer };
  useSocketEvent(socketRef, [mafiaEvent, policeEvent, doctorEvent, voteTimeEvent]);

  const executionEvent: Event = { event: EVENT.EXECUTION, handler: updatePlayerDead };
  const killEvent: Event = { event: EVENT.PUBLISH_VICTIM, handler: updatePlayerDead };
  const exitEvent: Event = { event: EVENT.EXIT, handler: updatePlayerDead };
  const voteEvent: Event = { event: EVENT.PUBLISH_VOTE, handler: updatePlayerVote };
  useSocketEvent(socketRef, [executionEvent, killEvent, exitEvent, voteEvent]);

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

  const initializePlayers = () => {
    const newPlayers: Player[] = initPlayers.map((user: User) => ({
      ...user,
      isDead: false,
      voteCount: 0,
    }));
    setPlayers(newPlayers);
  };

  useEffect(() => {
    resetSelected();
    updateSoundEffect();
  }, [isNight]);

  useEffect(() => {
    initializePlayers();
  }, []);

  return { players, mafias, emitAbility, getSelectedImg };
};

export default useAbility;
