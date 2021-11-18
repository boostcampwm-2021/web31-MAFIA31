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

export interface StoryDictionary {
  [story: string]: {
    msg: (name: string) => string;
    imgSrc: string;
    type: string;
  };
}

export interface Story {
  id: string;
  msg: string;
  imgSrc: string;
  type: string;
}

export interface Memo {
  userName: string;
  guessJob: string;
}
