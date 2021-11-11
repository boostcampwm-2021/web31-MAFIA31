export interface User {
  userName: string;
}

export interface PlayerInfo {
  userName: string;
  socketId: string;
  isReady: boolean; // false (방장은 true)
  isHost: boolean; // false (방장만 true)
  isDead: boolean; // false
  job: string;
  voteFrom: string[];
}

export interface PlayerState extends User {
  isDead: boolean;
}

export interface WaitingInfo extends User {
  isHost: boolean;
  isReady: boolean;
}
