/* eslint-disable no-unused-vars */
import { StoryName } from '@mafia/domain/types/chat';
import { User } from '@mafia/domain/types/user';

export interface StoryContent {
  msg: (name?: string, mafiaList?: string[]) => string;
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

export interface Event {
  event: string;
  handler: any;
}

export interface Player extends User {
  isDead: boolean;
  voteCount: number;
}

export interface Selected {
  victim?: string;
  survivor?: string;
  suspect?: string;
  candidate: string;
}
