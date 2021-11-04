import { Namespace, Socket } from 'socket.io';
import { Vote } from '../../../domain/types/vote';

interface VoteInfo {
  [key: string]: {
    [key: string]: number;
  };
}

const userInfo: string[] = ['user1', 'user2', 'user3'];
const voteInfo: VoteInfo = {};
let canVote: boolean = false;

const publish = (namespace: Namespace, roomId: string) => {
  let maxCnt = 0;
  let maxName = userInfo[0];
  let sameCnt = 0;

  Object.keys(voteInfo[roomId]).forEach((userName) => {
    if (voteInfo[roomId][userName] >= maxCnt) {
      if (voteInfo[roomId][userName] === maxCnt) sameCnt += 1;
      else {
        maxCnt = voteInfo[roomId][userName];
        maxName = userName;
        sameCnt = 0;
      }
    }
  });

  namespace
    .to(roomId)
    .emit('execution', { userName: maxCnt === 0 || sameCnt > 0 ? undefined : maxName });
};

const startVoteTime = (namespace: Namespace, roomId: string, time: number) => {
  canVote = true;

  setTimeout(() => {
    canVote = false;
    publish(namespace, roomId);

    userInfo.forEach((user) => {
      voteInfo[roomId][user] = 0;
    });
  }, time);
};

const gameSocketInit = (namespace: Namespace, socket: Socket, roomId: string): void => {
  voteInfo[roomId] = {};
  userInfo.forEach((user) => {
    voteInfo[roomId][user] = 0;
  });

  socket.on('vote', (vote: Vote) => {
    if (!canVote) return;

    voteInfo[roomId][vote.to] += 1;
    namespace.to(roomId).emit('publish vote', vote);
  });

  startVoteTime(namespace, roomId, 5000);
};

export default gameSocketInit;
