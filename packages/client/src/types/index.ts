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

export interface Story {
  msg: string;
  imgSrc: string;
}
