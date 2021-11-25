export interface Message {
  id: string;
  userName: string;
  profileImg: string;
  msg: string;
  isDead?: boolean;
}

export enum StoryName {
  EXECUTION = 'EXECUTION',
  NO_VOTE = 'NO_VOTE',
  PUBLISH_VICTIM = 'PUBLISH_VICTIM',
  NO_KILL = 'NO_KILL',
  PUBLISH_SURVIVOR = 'PUBLISH_SURVIVOR',
  POLICE_ABILITY = 'POLICE_ABILITY',
  NOTICE_MAFIA = 'NOTICE_MAFIA',
}
