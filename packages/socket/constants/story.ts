export type StoryDictionary = Record<StoryName, StoryContent>;

export enum StoryName {
  EXECUTION = 'EXECUTION',
  NO_VOTE = 'NO_VOTE',
  PUBLISH_VICTIM = 'PUBLISH_VICTIM',
  NO_KILL = 'NO_KILL',
  PUBLISH_SURVIVOR = 'PUBLISH_SURVIVOR',
  POLICE_CATCH = 'POLICE_CATCH',
  POLICE_WRONG = 'POLICE_WRONG',
  NOTICE_MAFIA = 'NOTICE_MAFIA',
}

export interface StoryContent {
  msg: (name?: string, mafiaList?: string[]) => string;
  src: string;
  type: string;
}

export const STORY_DIC: StoryDictionary = {
  EXECUTION: {
    msg: (name) => `🗳 투표로 ${name}이(가) 죽었어요!`,
    src: '/assets/images/vote-kill.png',
    type: 'css animation',
  },
  NO_VOTE: {
    msg: () => `🌈 투표로 죽은 사람이 없는 날이네요!`,
    src: '/assets/images/peaceful-day.mp4',
    type: 'mp4 animation',
  },
  PUBLISH_VICTIM: {
    msg: (name) => `🔫 탕! ${name}이(가) 죽었어요!`,
    src: '/assets/images/mafia-kill.mp4',
    type: 'mp4 animation',
  },
  NO_KILL: {
    msg: () => `🌈 오늘 밤은 총소리가 들리지 않았어요!`,
    src: '/assets/images/peaceful-day.mp4',
    type: 'mp4 animation',
  },
  PUBLISH_SURVIVOR: {
    msg: (name) => `🚑 의사의 활약으로 ${name}이(가) 마피아의 공격에서 살아남았습니다!`,
    src: '/assets/images/doctor-heal.mp4',
    type: 'mp4 animation',
  },
  POLICE_CATCH: {
    msg: (name) => `😆 ${name}은(는) 마피아가 맞습니다!`,
    src: '/assets/images/police-catch.mp4',
    type: 'mp4 animation',
  },
  POLICE_WRONG: {
    msg: (name) => `🥲 ${name}은(는) 마피아가 아닙니다!`,
    src: '/assets/images/police-wrong.mp4',
    type: 'mp4 animation',
  },
  NOTICE_MAFIA: {
    msg: (_, mafiaList) => `🤠 ${mafiaList?.join(', ')}은(는) 마피아 입니다.`,
    src: '/assets/images/mafias.mp4',
    type: 'mp4 animation',
  },
};
