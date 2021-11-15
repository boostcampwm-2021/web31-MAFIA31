export interface GameInfo {
  socketId: string;
  userName: string;
  job: string;
  isDead: boolean;
  voteFrom: string[];
}

export interface PlayerState {
  userName: string;
  isDead: boolean;
}

export interface MafiaPick {
  mafia: string;
  victim: string;
}

export interface PlayerResult {
  userName: string;
  job: string;
  result: boolean;
}
