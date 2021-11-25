import { StoryName } from './chat';

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
  isMafia: boolean;
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
  storyName: StoryName;
}

export interface Stat {
  killRate?: number;
  winRate?: number;
  cnt: number;
  winCnt: number;
  mvpCnt?: number;
}

export enum Job {
  mafia = 'mafia',
  citizen = 'citizen',
  doctor = 'doctor',
  police = 'police',
}

export type JobStat = Record<Job, Stat>;
