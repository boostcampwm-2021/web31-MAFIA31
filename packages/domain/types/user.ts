export interface User {
  userName: string;
}

export interface PlayerState extends User {
  isDead: boolean;
}
