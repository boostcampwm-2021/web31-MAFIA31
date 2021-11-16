import { EXECUTION } from '@mafia/domain/constants/event';
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
  namespace.emit(EXECUTION, excutedPlayer);
};

const startVoteTime = (namespace: Namespace, roomId: string, time: number) => {
  flag = true;

  setTimeout(() => {
    flag = false;
    publishExecution(namespace, roomId);
    GameStore.resetVote(roomId);
  }, time);
};

export { startVoteTime, canVote };
