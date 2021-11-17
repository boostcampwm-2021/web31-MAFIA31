import * as EVENT from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { Namespace } from 'socket.io';
import GameStore from '../stores/GameStore';

let flag: boolean = false;
const canVote = (): boolean => flag;

const publishExecution = (namespace: Namespace, roomId: string) => {
  const playerList = GameStore.get(roomId);
  let isSame = false;
  let maxPlayer = '';
  let maxCount = 0;

  playerList.forEach(({ userName, voteFrom }) => {
    const voteCount = voteFrom.size;
    if (voteCount === maxCount) {
      isSame = true;
    } else if (voteCount > maxCount) {
      isSame = false;
      maxPlayer = userName;
      maxCount = voteCount;
    }
  });
  const excutedPlayer = { userName: maxCount === 0 || isSame ? undefined : maxPlayer };
  namespace.emit(EVENT.EXECUTION, excutedPlayer);
};

const startVoteTime = (namespace: Namespace, roomId: string, seconds: number) => {
  flag = true;
  namespace.emit(EVENT.VOTE_TIME, seconds);

  setTimeout(() => {
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_ALARM);
  }, seconds * 1000 - TIME.VOTE_ALARM * 1000);

  setTimeout(() => {
    flag = false;
    namespace.emit(EVENT.VOTE_TIME, 0);
    publishExecution(namespace, roomId);
    GameStore.resetVote(roomId);
  }, seconds * 1000);
};

export { startVoteTime, canVote };
