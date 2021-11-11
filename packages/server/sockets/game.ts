import * as EVENT from '@mafia/domain/constants/event';
import { GameInfo } from '@mafia/domain/types/game';
import { Vote } from '@mafia/domain/types/vote';
import { Namespace, Socket } from 'socket.io';
import { JOB_ARR } from '../constants/job';
import GameStore from '../stores/GameStore';
import RoomStore from '../stores/RoomStore';
import { publishVictim } from './ability';
import { canVote, startVoteTime } from './vote';

const getGameResult = (roomId: string) => {
  const { mafia } = GameStore.getDashBoard(roomId);
  const win = mafia === 0 ? 'citizen' : 'mafia';
  return GameStore.getGameResult(roomId, win);
};

const checkEnd = (roomId: string) => {
  const { mafia, citizen } = GameStore.getDashBoard(roomId);
  return mafia >= citizen || mafia === 0;
};

const startTimer = (namespace: Namespace, roomId: string) => {
  let counter = 0;
  const interval = 60;
  let isNight: boolean = true;

  const gameInterval = setInterval(() => {
    if (counter % interval === 0) {
      if (checkEnd(roomId)) {
        namespace.emit(EVENT.GAME_OVER, getGameResult(roomId));
        clearInterval(gameInterval);
        return;
      }

      isNight = !isNight;
      if (!isNight) {
        startVoteTime(namespace, roomId, 10000);
        publishVictim(namespace);
      }
      namespace.emit(EVENT.TURN_CHANGE, isNight);
    }

    const remainSecond = interval - (counter % interval);
    namespace.emit(EVENT.TIMER, remainSecond);

    counter += 1;
  }, 1000);
};

const readyPlayer = (namespace: Namespace, roomId: string, readyUserName: string) => {
  const readyUser = RoomStore.get(roomId).find(({ userName }) => userName === readyUserName);

  if (!readyUser) return;
  readyUser.isReady = !readyUser.isReady;
  namespace.emit(EVENT.PUBLISH_READY, RoomStore.get(roomId));
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
  GameStore.get(roomId).forEach(({ socketId, job }) => namespace.in(socketId).socketsJoin(job));

  namespace.to('mafia').emit(EVENT.PUBLISH_JOB, { job: 'mafia' });
  namespace.to('citizen').emit(EVENT.PUBLISH_JOB, { job: 'citizen' });
};

const startGame = (namespace: Namespace, roomId: string) => {
  assignJobs(roomId);
  emitJobs(namespace, roomId);
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

  socket.on(EVENT.READY, ({ userName }) => readyPlayer(namespace, roomId, userName));
  socket.on(EVENT.GAME_START, () => startGame(namespace, roomId));
  socket.on(EVENT.VOTE, ({ to, from }: Vote) => votePlayer(namespace, roomId, to, from));
};

export default gameSocketInit;
