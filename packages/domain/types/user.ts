export interface User {
  userName: string;
}

export interface PlayerState extends User {
  isDead: boolean;
}

export interface WaitingInfo extends User {
  isHost: boolean;
  isReady: boolean;
}
