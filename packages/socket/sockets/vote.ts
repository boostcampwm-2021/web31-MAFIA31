import * as EVENT from '@mafia/domain/constants/event';
import {
  EXECUTION,
  PUBLISH_MAX_VOTE,
  PUBLISH_STORY,
  PUBLISH_VOTE,
} from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { StoryName } from '@mafia/domain/types/chat';
import { Namespace, Socket } from 'socket.io';
import { STORY_DIC } from '../constants/story';
import GameStore from '../stores/GameStore';

interface crossVotePlayer {
  userName: string | undefined;
  voteCnt: number;
}

let voteFlag: boolean = false;
const canVote = (): boolean => voteFlag;

const crossVoteCntStore: Record<string, crossVotePlayer> = {};

const countCrossVote = (socket: Socket, roomId: string) => {
  socket.on(EVENT.CROSS_VOTE, () => {
    crossVoteCntStore[roomId].voteCnt += 1;
  });
};

const publishMaxVote = (namespace: Namespace, roomId: string) => {
  const playerList = GameStore.get(roomId);
  let isSame = false;
  let maxPlayer = '';
  let maxCount = 0;

  if (!playerList) return;

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
  const maxVotePlayer = maxCount === 0 || isSame ? undefined : maxPlayer;

  GameStore.resetVote(roomId);
  crossVoteCntStore[roomId] = { userName: maxVotePlayer, voteCnt: 0 };
  namespace.emit(PUBLISH_VOTE, GameStore.getVoteInfos(roomId));
  namespace.emit(PUBLISH_MAX_VOTE, maxVotePlayer);
};

const getStory = (storyName: StoryName, name: string = '') => ({
  id: Date.now().toString(),
  msg: STORY_DIC[storyName].msg(name),
  imgSrc: STORY_DIC[storyName].src,
  type: STORY_DIC[storyName].type,
});

const publishExecution = (namespace: Namespace, roomId: string) => {
  const playerList = GameStore.get(roomId);
  if (!playerList) return;

  const crossVoteCnt = crossVoteCntStore[roomId].voteCnt;
  const alivePlayerList = playerList.filter((player) => !player.isDead);
  if (crossVoteCnt < alivePlayerList.length / 2) {
    crossVoteCntStore[roomId].userName = undefined;
  }
  const executedPlayer = crossVoteCntStore[roomId].userName;

  if (!executedPlayer) {
    namespace.emit(PUBLISH_STORY, getStory(StoryName.NO_VOTE));
    crossVoteCntStore[roomId] = { userName: '', voteCnt: 0 };
    return;
  }

  const deadSocketId = GameStore.getSocketId(roomId, executedPlayer);
  if (deadSocketId) {
    namespace.in(deadSocketId).socketsJoin('shaman');
  }

  GameStore.diePlayer(roomId, executedPlayer!);
  namespace.emit(EXECUTION, executedPlayer);
  namespace.emit(PUBLISH_STORY, getStory(StoryName.EXECUTION, executedPlayer));
  crossVoteCntStore[roomId] = { userName: '', voteCnt: 0 };
};

const startVoteTime = (namespace: Namespace, roomId: string) => {
  voteFlag = true;
  namespace.emit(EVENT.VOTE_TIME, TIME.VOTE);

  setTimeout(() => {
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_ALARM);
  }, (TIME.VOTE - TIME.VOTE_ALARM) * TIME.SEC);

  setTimeout(() => {
    voteFlag = false;
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_END);
    publishMaxVote(namespace, roomId);
  }, (TIME.VOTE - TIME.VOTE_END) * TIME.SEC);

  setTimeout(() => {
    namespace.emit(EVENT.VOTE_TIME, TIME.VOTE_END);
    publishExecution(namespace, roomId);
  }, TIME.VOTE_START * TIME.SEC);
};

export { startVoteTime, canVote, countCrossVote };
