import { StoryDictionary } from '@src/types';

export const STORY_DICTIONARY: StoryDictionary = {
  EXECUTED: {
    msg: (name) => `투표로 ${name}이 죽었어요!`,
    imgSrc: 'assets/images/mafia-kill.png',
  },
  KILLED: {
    msg: (name) => `탕! ${name}이 죽었어요!`,
    imgSrc: 'assets/images/mafia-kill.png',
  },
};
