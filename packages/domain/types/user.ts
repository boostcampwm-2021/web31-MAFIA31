export interface User {
  userName: string;
}
export interface PlayerState {
  userName: string;
  isDead: boolean;
}

export interface WaitingInfo extends User {
  isHost: boolean;
  isReady: boolean;
}
