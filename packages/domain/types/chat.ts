export interface Message {
  id: string;
  userName: string;
  msg: string;
  profileImg: string;
}

export enum StoryName {
  EXECUTION = 'EXECUTION',
  PUBLISH_VICTIM = 'PUBLISH_VICTIM',
  NO_KILL = 'NO_KILL',
  PUBLISH_SURVIVOR = 'PUBLISH_SURVIVOR',
  POLICE_ABILITY = 'POLICE_ABILITY',
  NOTICE_MAFIA = 'NOTICE_MAFIA',
}
