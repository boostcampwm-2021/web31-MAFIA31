import { EXECUTION } from 'domain/constants/event';
import { Namespace } from 'socket.io';
import { getChannelUser, getChannelVote, resetChannelVote } from './game';

let flag: boolean = false;

const publish = (namespace: Namespace, roomId: string) => {
  const userInfo = getChannelUser(roomId);
  const voteInfo = getChannelVote(roomId);
  let maxCnt = 0;
  let maxName = Object.keys(userInfo)[0];
  let sameCnt = 0;

  Object.keys(userInfo).forEach((userName) => {
    if (voteInfo[userName].length >= maxCnt) {
      if (voteInfo[userName].length === maxCnt) sameCnt += 1;
      else {
        maxCnt = voteInfo[userName].length;
        maxName = userName;
        sameCnt = 0;
      }
    }
  });
  namespace.emit(EXECUTION, { userName: maxCnt === 0 || sameCnt > 0 ? undefined : maxName });
};

const startVoteTime = (namespace: Namespace, roomId: string, time: number) => {
  flag = true;

  setTimeout(() => {
    flag = false;
    publish(namespace, roomId);
    resetChannelVote(roomId);
  }, time);
};

const canVote = (): boolean => flag;

export { startVoteTime, canVote };
