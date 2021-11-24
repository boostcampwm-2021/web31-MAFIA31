import * as EVENT from '@mafia/domain/constants/event';
import * as TIME from '@mafia/domain/constants/time';
import { StoryName } from '@mafia/domain/types/chat';
import { GameInfo, PlayerResult } from '@mafia/domain/types/game';
import { Vote } from '@mafia/domain/types/vote';
import { Namespace, Socket } from 'socket.io';
import apiClient from '../axios/apiClient';
import { JOB_ARR } from '../constants/job';
import GameStore from '../stores/GameStore';
import RoomStore from '../stores/RoomStore';
import { publishVictim } from './ability';
import { canVote, startVoteTime } from './vote';

const getGameResult = (roomId: string): PlayerResult[] => {
  const { mafia } = GameStore.getDashBoard(roomId);
  const win = mafia === 0 ? 'citizen' : 'mafia';
  return GameStore.getGameResult(roomId, win);
};

const updateRoomStatus = async (roomId: string, status: string) => {
  await apiClient.put('/rooms', {
    roomId: roomId.split('/')[1],
    status,
  });
};

const updateStats = async (roomId: string) => {
  const result = getGameResult(roomId);
  await apiClient.post('/users/stat', {
    result,
  });
};

const endGame = (
  namespace: Namespace,
  roomId: string,
  interval: ReturnType<typeof setInterval>,
) => {
  namespace.emit(EVENT.GAME_OVER, getGameResult(roomId));
  clearInterval(interval);
  updateRoomStatus(roomId, 'ready');
  updateStats(roomId);
};

const checkEnd = (roomId: string) => {
  if (RoomStore.get(roomId).length === 0) {
    return true;
  }

  const { mafia, citizen } = GameStore.getDashBoard(roomId);

  return mafia >= citizen || mafia === 0;
};

const changeTurn = (
  namespace: Namespace,
  roomId: string,
  interval: ReturnType<typeof setInterval>,
  isNight: boolean,
) => {
  if (checkEnd(roomId)) {
    endGame(namespace, roomId, interval);
    return;
  }

  namespace.emit(EVENT.TURN_CHANGE, isNight);

  if (isNight) {
    GameStore.setCanInvest(true);
    return;
  }

  publishVictim(namespace);
};

const startTimer = (namespace: Namespace, roomId: string) => {
  let counter = TIME.DAY_DURATION;
  let isNight: boolean = false;

  namespace.emit(EVENT.TIMER, counter);
  namespace.emit(EVENT.TURN_CHANGE, isNight);

  const gameTimer = setInterval(() => {
    counter -= 1;
    namespace.emit(EVENT.TIMER, counter);

    if (!isNight && counter === TIME.VOTE_START) {
      startVoteTime(namespace, roomId);
    }

    if (counter !== 0) return;

    isNight = !isNight;
    if (isNight) {
      counter = TIME.NIGHT_DURATION + 1;
    } else {
      counter = TIME.DAY_DURATION + 1;
    }

    changeTurn(namespace, roomId, gameTimer, isNight);
  }, TIME.SEC);
};

const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

const assignJobs = (roomId: string) => {
  const jobs = JOB_ARR[RoomStore.get(roomId).length];
  const mixedJobs = shuffle(jobs);

  if (jobs.length <= 0) throw Error('잘못된 인원입니다.');
  const gameInfoList = RoomStore.get(roomId).map(
    ({ userName, socketId, profileImg }, idx): GameInfo => ({
      socketId,
      userName,
      profileImg,
      isDead: false,
      job: mixedJobs[idx],
      voteFrom: new Set(),
    }),
  );
  GameStore.initGame(roomId, gameInfoList);
};

const emitJobs = (namespace: Namespace, roomId: string): void => {
  GameStore.get(roomId).forEach(({ socketId, job }) => {
    namespace.in(socketId).socketsJoin(job);
    namespace.to(socketId).emit(EVENT.PUBLISH_JOB, { job });
  });
};

const noticeMafia = (namespace: Namespace, roomId: string): void => {
  const mafiaList: string[] = [];
  GameStore.get(roomId).forEach(({ job, userName }) => {
    if (job === 'mafia') {
      mafiaList.push(userName);
    }
  });
  namespace.to('mafia').emit(EVENT.NOTICE_MAFIA, {
    storyName: StoryName.NOTICE_MAFIA,
    mafiaList,
  });
};

const startGame = (namespace: Namespace, roomId: string) => {
  updateRoomStatus(roomId, 'start');
  assignJobs(roomId);
  namespace.emit(EVENT.PUBLISH_GAME_START);
  startTimer(namespace, roomId);
  emitJobs(namespace, roomId);
  noticeMafia(namespace, roomId);
};

const votePlayer = (namespace: Namespace, roomId: string, voteInfo: Vote) => {
  if (!canVote() || !GameStore.voteUser(roomId, voteInfo)) return;
  namespace.emit(EVENT.PUBLISH_VOTE, GameStore.getVoteInfos(roomId));
};

const gameSocketInit = (socket: Socket): void => {
  const { nsp: namespace } = socket;
  const { name: roomId } = namespace;

  socket.on(EVENT.GAME_START, () => startGame(namespace, roomId));
  socket.on(EVENT.VOTE, (voteInfo: Vote) => votePlayer(namespace, roomId, voteInfo));
};

export default gameSocketInit;
