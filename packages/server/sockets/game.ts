import * as EVENT from '@mafia/domain/constants/event';
import { GameInfo, PlayerResult } from '@mafia/domain/types/game';
import { Vote } from '@mafia/domain/types/vote';
import { Namespace, Socket } from 'socket.io';
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

const checkEnd = (roomId: string) => {
  const { mafia, citizen } = GameStore.getDashBoard(roomId);
  console.log('mafia:citizen', mafia, citizen);
  return mafia >= citizen || mafia === 0;
};

const startTimer = (namespace: Namespace, roomId: string) => {
  const TURN_TIME = 60;
  let counter = -1;
  let isNight: boolean = false;

  const gameTimer = setInterval(() => {
    const remainTime = TURN_TIME - counter;
    namespace.emit(EVENT.TIMER, remainTime);
    counter = (counter + 1) % TURN_TIME;

    if (counter !== 0) return;
    if (checkEnd(roomId)) {
      namespace.emit(EVENT.GAME_OVER, getGameResult(roomId));
      clearInterval(gameTimer);
      return;
    }

    isNight = !isNight;
    namespace.emit(EVENT.TURN_CHANGE, isNight);

    if (isNight) return;
    startVoteTime(namespace, roomId, 10000);
    publishVictim(namespace);
  }, 1000);
};

const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);
const assignJobs = (roomId: string) => {
  const jobs = JOB_ARR[RoomStore.get(roomId).length];
  const mixedJobs = shuffle(jobs);

  if (jobs.length <= 0) throw Error('잘못된 인원입니다.');
  const gameInfoList = RoomStore.get(roomId).map(
    ({ userName, socketId }, idx): GameInfo => ({
      socketId,
      userName,
      isDead: false,
      job: mixedJobs[idx],
      voteFrom: [],
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

const startGame = (namespace: Namespace, roomId: string) => {
  assignJobs(roomId);
  emitJobs(namespace, roomId);
  namespace.emit(EVENT.PUBLISH_GAME_START);
  startTimer(namespace, roomId);
};

const votePlayer = (namespace: Namespace, roomId: string, to: string, from: string) => {
  const votedUser = GameStore.get(roomId)?.find(({ userName }) => to === userName);
  if (!canVote() || !votedUser) return;

  votedUser.voteFrom.push(from);
  namespace.emit(EVENT.PUBLISH_VOTE, GameStore.getVoteInfos(roomId));
};

const gameSocketInit = (socket: Socket): void => {
  const { nsp: namespace } = socket;
  const { name: roomId } = namespace;

  socket.on(EVENT.GAME_START, () => startGame(namespace, roomId));
  socket.on(EVENT.VOTE, ({ to, from }: Vote) => votePlayer(namespace, roomId, to, from));
};

export default gameSocketInit;
