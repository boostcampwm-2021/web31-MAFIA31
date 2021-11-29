export interface Message {
  id: string;
  userName: string;
  profileImg: string;
  msg: string;
  isDead: boolean;
  isMafia: boolean;
}

export interface Story {
  id: string;
  msg: string;
  imgSrc: string;
  type?: string;
}

export enum StoryName {
  EXECUTION = 'EXECUTION',
  NO_VOTE = 'NO_VOTE',
  PUBLISH_VICTIM = 'PUBLISH_VICTIM',
  NO_KILL = 'NO_KILL',
  PUBLISH_SURVIVOR = 'PUBLISH_SURVIVOR',
  POLICE_CATCH = 'POLICE_CATCH',
  POLICE_WRONG = 'POLICE_WRONG',
  NOTICE_MAFIA = 'NOTICE_MAFIA',
}
