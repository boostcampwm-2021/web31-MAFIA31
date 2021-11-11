import {
  GAME_OVER,
  GAME_START,
  PUBLISH_JOB,
  PUBLISH_READY,
  PUBLISH_VOTE,
  READY,
  TIMER,
  TURN_CHANGE,
  VOTE,
} from '@mafia/domain/constants/event';
import { GameResult, Job } from '@mafia/domain/types/game';
import { PlayerInfo, WaitingInfo } from '@mafia/domain/types/user';
import { RoomVote, Vote } from '@mafia/domain/types/vote';
import { Namespace, Socket } from 'socket.io';
import { JOB_ARR } from '../constants/job';
import RoomStore from '../stores/RoomStore';
import { abilitySocketInit, publishVictim } from './ability';
import { canVote, startVoteTime } from './vote';

interface ChannelVote {
  [roomId: string]: RoomVote;
}

interface ChannelUser {
  [roomId: string]: {
    [userName: string]: Object;
  };
}

interface DashBoard {
  mafia: number;
  citizen: number;
}

const channelUser: ChannelUser = { hi: { user1: {}, user2: {}, user3: {} } };
const channelVote: ChannelVote = {};
const getChannelVote = (roomId: string) => channelVote[roomId];
const getChannelUser = (roomId: string) => channelUser[roomId];

const resetChannelVote = (roomId: string) => {
  Object.keys(channelUser[roomId]).forEach((user) => {
    channelVote[roomId][user] = [];
  });
};

const checkEnd = (dashBoard: DashBoard) => {
  if (dashBoard.mafia >= dashBoard.citizen) {
    return true;
  }
  if (dashBoard.mafia === 0) {
    return true;
  }
  return false;
};

const getGameResult = (dashBoard: DashBoard, jobAssignment: Job[]): GameResult[] => {
  if (dashBoard.mafia === 0) {
    return jobAssignment.map((el) => ({ ...el, result: el.job === 'citizen' }));
  }
  return jobAssignment.map((el) => ({ ...el, result: el.job === 'mafia' }));
};

const startTimer = (
  dashBoard: DashBoard,
  jobAssignment: Job[],
  namespace: Namespace,
  roomId: string,
) => {
  let counter = 0;
  const interval = 60;
  let isNight: boolean = true;

  const gameInterval = setInterval(() => {
    if (counter % interval === 0) {
      if (checkEnd(dashBoard)) {
        namespace.emit(GAME_OVER, getGameResult(dashBoard, jobAssignment));
        clearInterval(gameInterval);
        return;
      }

      isNight = !isNight;
      if (!isNight) {
        startVoteTime(namespace, roomId, 10000);
        publishVictim(namespace);
      }
      namespace.emit(TURN_CHANGE, isNight);
    }

    const remainSecond = interval - (counter % interval);
    namespace.emit(TIMER, remainSecond);

    counter += 1;
  }, 1000);
};

const assignJobs = (playerList: PlayerInfo[]): PlayerInfo[] => {
  const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

  const jobs = JOB_ARR[playerList.length];
  const mixedJobs = shuffle(jobs);

  if (jobs.length <= 0) throw Error('잘못된 인원입니다.');
  return playerList.map((player, idx) => ({ ...player, job: mixedJobs[idx] }));
};

const emitJobs = (namespace: Namespace, playerList: PlayerInfo[]): void => {
  playerList.forEach(({ socketId, job }) => namespace.in(socketId).socketsJoin(job));

  namespace.to('mafia').emit(PUBLISH_JOB, { job: 'mafia' });
  namespace.to('citizen').emit(PUBLISH_JOB, { job: 'citizen' });
};

const gameSocketInit = (namespace: Namespace, socket: Socket, roomId: string): void => {
  const { data } = RoomStore.getInstance();
  let playerList = data[roomId];

  playerList = assignJobs(playerList);
  emitJobs(namespace, playerList);

  channelVote[roomId] = {};
  channelUser[roomId] = {};
  resetChannelVote(roomId);
  abilitySocketInit(namespace, socket, playerList);

  // 직업 배정 로직으로 초기화 할 값 (dashBoard, jobAssignment)
  const dashBoard: DashBoard = { mafia: 2, citizen: 6 };
  const jobAssignment: Job[] = [
    { userName: 'a', job: 'mafia' },
    { userName: 'b', job: 'mafia' },
    { userName: 'c', job: 'citizen' },
    { userName: 'd', job: 'citizen' },
    { userName: 'e', job: 'citizen' },
    { userName: 'f', job: 'citizen' },
    { userName: 'g', job: 'citizen' },
    { userName: 'h', job: 'citizen' },
  ];

  socket.on(READY, ({ userName, isReady }: WaitingInfo) => {
    const { data: currentData } = RoomStore.getInstance();
    const currentPlayerList = currentData[roomId];
    const readyUser = currentPlayerList.find((player) => player.userName === userName);
    if (!readyUser) return;

    readyUser.isReady = isReady;
    namespace.emit(PUBLISH_READY, currentPlayerList);
  });

  socket.on(VOTE, ({ to, from }: Vote) => {
    if (!canVote()) return;
    channelVote[roomId][to] = [...new Set(channelVote[roomId][to] ?? []).add(from)];
    namespace.emit(PUBLISH_VOTE, channelVote[roomId]);
  });

  socket.on(GAME_START, () => {});

  // socket.on(GAME_START, () => {
  startTimer(dashBoard, jobAssignment, namespace, roomId);
  // });
};

export { resetChannelVote, getChannelUser, getChannelVote };

export default gameSocketInit;
