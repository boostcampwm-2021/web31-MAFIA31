import { StoryDictionary } from '@src/types';

export const STORY_DICTIONARY: StoryDictionary = {
  EXECUTION: {
    msg: (name) => `투표로 ${name}이(가) 죽었어요!`,
    imgSrc: '/assets/images/vote-kill.png',
  },
  PUBLISH_VICTIM: {
    msg: (name) => `탕! ${name}이(가) 죽었어요!`,
    imgSrc: '/assets/images/mafia-kill.mp4',
  },
  NO_KILL: {
    msg: () => `오늘 밤은 총소리가 들리지 않았어요!`,
    imgSrc: '/assets/images/citizen.png',
  },
};
