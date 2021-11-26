import { StoryDictionary } from '@src/types';

export const STORY_DICTIONARY: StoryDictionary = {
  EXECUTION: {
    msg: (name) => `🗳 투표로 ${name}이(가) 죽었어요!`,
    imgSrc: '/assets/images/vote-kill.png',
    type: 'execution',
  },
  NO_VOTE: {
    msg: () => `🌈 투표로 죽은 사람이 없는 날이네요!`,
    imgSrc: '/assets/images/peaceful-day.mp4',
  },
  PUBLISH_VICTIM: {
    msg: (name) => `🔫 탕! ${name}이(가) 죽었어요!`,
    imgSrc: '/assets/images/mafia-kill.mp4',
  },
  NO_KILL: {
    msg: () => `🌈 오늘 밤은 총소리가 들리지 않았어요!`,
    imgSrc: '/assets/images/peaceful-day.mp4',
  },
  PUBLISH_SURVIVOR: {
    msg: (name) => `🚑 의사의 활약으로 ${name}이(가) 마피아의 공격에서 살아남았습니다!`,
    imgSrc: '/assets/images/doctor-heal.mp4',
  },
  POLICE_CATCH: {
    msg: (name) => `😆 ${name}은(는) 마피아가 맞습니다!`,
    imgSrc: '/assets/images/police-catch.mp4',
  },
  POLICE_WRONG: {
    msg: (name) => `🥲 ${name}은(는) 마피아가 아닙니다!`,
    imgSrc: '/assets/images/police-wrong.mp4',
  },
  NOTICE_MAFIA: {
    msg: (_, mafiaList) => `🤠 ${mafiaList?.join(', ')}은(는) 마피아 입니다.`,
    imgSrc: '/assets/images/mafias.mp4',
  },
};
