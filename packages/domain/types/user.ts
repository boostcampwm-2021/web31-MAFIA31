export interface User {
  userName: string;
}

export interface PlayerInfo extends User {
  socketId: string;
  isReady: boolean;
  isHost: boolean;
}
