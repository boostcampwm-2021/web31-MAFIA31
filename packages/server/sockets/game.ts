import * as EVENT from '@mafia/domain/constants/event';
import { GameInfo, PlayerResult } from '@mafia/domain/types/game';
import { Vote } from '@mafia/domain/types/vote';
import axios from 'axios';
import { Namespace, Socket } from 'socket.io';
import { apiURL } from '../config/url.config.json';
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

const updateStats = (roomId: string) => {
  const result = getGameResult(roomId);
  axios.post(`${apiURL}/user/update`, {
    result,
  });
};

const startTimer = (namespace: Namespace, roomId: string) => {
  const VOTE_TIME = 10000;
  const TURN_TIME = 60;
  let counter = 0;
  let isNight: boolean = true;

  const remainTime = TURN_TIME - counter;
  namespace.emit(EVENT.TIMER, remainTime);
  startVoteTime(namespace, roomId, VOTE_TIME);

  const gameTimer = setInterval(() => {
    counter = (counter + 1) % TURN_TIME;
    const remainTime = TURN_TIME - counter;
    namespace.emit(EVENT.TIMER, remainTime);

    if (counter !== 0) return;
    if (checkEnd(roomId)) {
      namespace.emit(EVENT.GAME_OVER, getGameResult(roomId));
      clearInterval(gameTimer);
      updateStats(roomId);
      return;
    }

    isNight = !isNight;
    namespace.emit(EVENT.TURN_CHANGE, isNight);

    if (isNight) return;
    startVoteTime(namespace, roomId, VOTE_TIME);
    publishVictim(namespace);
  }, 1000);
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

const startGame = (namespace: Namespace, roomId: string) => {
  assignJobs(roomId);
  emitJobs(namespace, roomId);
  namespace.emit(EVENT.PUBLISH_GAME_START);
  startTimer(namespace, roomId);
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
