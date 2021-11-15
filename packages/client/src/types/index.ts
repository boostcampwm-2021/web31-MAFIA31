/* eslint-disable no-unused-vars */
import { Message } from '@mafia/domain/types/chat';
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

export interface MessageClient extends Message {
  isStory: boolean;
  imgSrc: string;
}

export interface Story {
  id: string;
  msg: string;
  imgSrc: string;
  isStory: boolean;
  userName?: string;
}

export interface StoryDictionary {
  [story: string]: {
    msg: (name: string) => string;
    imgSrc: string;
  };
}
