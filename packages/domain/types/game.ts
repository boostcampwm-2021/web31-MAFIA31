export interface GameInfo {
  socketId: string;
  userName: string;
  profileImg: string;
  job: string;
  isDead: boolean;
  voteFrom: Set<string>;
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

export interface PoliceInvestigation {
  userName: string;
  isMafia: boolean;
}
