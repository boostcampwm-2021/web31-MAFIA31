import { User } from 'domain/types/user';

export interface RoomInfo {
  roomId: string;
  title: string;
  host: string;
}

export interface PlayerInfo {
  userImg: string;
  userName: string;
  voteFrom: string[];
}

export interface WaitingInfo extends User {
  isHost: boolean;
  isReady: boolean;
}
