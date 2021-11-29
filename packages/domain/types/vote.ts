export interface Vote {
  from: string;
  to: string;
}

export type RoomVote = Record<string, number>;
