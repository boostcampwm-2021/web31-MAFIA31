/* eslint-disable no-unused-vars */
import { StoryName } from '@mafia/domain/types/chat';
import { User } from '@mafia/domain/types/user';

export interface PlayerInfo extends User {
  userImg: string;
  voteFrom: string[];
}

export interface StoryContent {
  msg: (name?: string, isMafia?: boolean, mafiaList?: string[]) => string;
  imgSrc: string;
  type?: string;
}

export type StoryDictionary = Record<StoryName, StoryContent>;

export interface Story {
  id: string;
  msg: string;
  imgSrc: string;
  type?: string;
}

export interface Memo {
  userName: string;
  guessJob: string;
}
