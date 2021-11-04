import { Namespace, Socket } from 'socket.io';
import { Vote } from '../../../domain/types/vote';
import { canVote, startVoteTime } from './vote';

interface VoteInfo {
  [key: string]: {
    [key: string]: number;
  };
}
interface UserInfo {
  [key: string]: {
    [key: string]: Object;
  };
}

const VOTE = 'vote';
const PUBLISH_VOTE = 'publish vote';

const userInfo: UserInfo = { hi: { user1: {}, user2: {}, user3: {} } };
const voteInfo: VoteInfo = {};
const getVoteInfo = (roomId: string) => voteInfo[roomId];
const getUserInfo = (roomId: string) => userInfo[roomId];

const resetVoteInfo = (roomId: string) => {
  Object.keys(userInfo[roomId]).forEach((user) => {
    voteInfo[roomId][user] = 0;
  });
};

const gameSocketInit = (namespace: Namespace, socket: Socket, roomId: string): void => {
  voteInfo[roomId] = {};
  resetVoteInfo(roomId);

  socket.on(VOTE, (vote: Vote) => {
    if (!canVote()) return;

    voteInfo[roomId][vote.to] += 1;
    namespace.to(roomId).emit(PUBLISH_VOTE, vote);
  });

  startVoteTime(namespace, roomId, 6000);
};

export { resetVoteInfo, getUserInfo, getVoteInfo };
export default gameSocketInit;
