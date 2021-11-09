export interface Vote {
  from: string;
  to: string;
}

export interface RoomVote {
  [userName: string]: string[];
}
