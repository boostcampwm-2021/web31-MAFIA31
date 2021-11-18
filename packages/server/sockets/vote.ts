import * as EVENT from '@mafia/domain/constants/event';
import { EXECUTION, PUBLISH_VOTE } from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { StoryName } from '@mafia/domain/types/chat';
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

  const excutedPlayer = maxCount === 0 || isSame ? undefined : maxPlayer;
  GameStore.resetVote(roomId);
  GameStore.diePlayer(roomId, excutedPlayer || '');
  namespace.emit(EXECUTION, { userName: excutedPlayer, storyName: StoryName.EXECUTION });
  namespace.emit(PUBLISH_VOTE, GameStore.getVoteInfos(roomId));
};

const startVoteTime = (namespace: Namespace, roomId: string) => {
  flag = true;
  namespace.emit(EVENT.VOTE_TIME, TIME.VOTE);

  setTimeout(() => {
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_ALARM);
  }, (TIME.VOTE - TIME.VOTE_ALARM) * TIME.SEC);

  setTimeout(() => {
    flag = false;
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_END);
    publishExecution(namespace, roomId);
  }, (TIME.VOTE - TIME.VOTE_END) * TIME.SEC);
};

export { startVoteTime, canVote };
