/* eslint-disable no-unused-vars */
import { User } from '@mafia/domain/types/user';

export interface RoomInfo {
  roomId: string;
  title: string;
  host: string;
}

export interface PlayerInfo extends User {
  userImg: string;
  voteFrom: string[];
}

export enum StoryName {
  EXECUTION = 'EXECUTION',
  PUBLISH_VICTIM = 'PUBLISH_VICTIM',
  NO_KILL = 'NO_KILL',
  PUBLISH_SURVIVOR = 'PUBLISH_SURVIVOR',
}

export interface StoryContent {
  msg: (name: string) => string;
  imgSrc: string;
}

export type StoryDictionary = Record<StoryName, StoryContent>;

export interface Story {
  id: string;
  msg: string;
  imgSrc: string;
}

export interface Memo {
  userName: string;
  guessJob: string;
}
