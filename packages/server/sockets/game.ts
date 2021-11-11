import {
  GAME_OVER,
  GAME_START,
  PUBLISH_READY,
  PUBLISH_VOTE,
  READY,
  TIMER,
  TURN_CHANGE,
  VOTE,
} from '@mafia/domain/constants/event';
import { GameResult, Job } from '@mafia/domain/types/game';
import { PlayerInfo } from '@mafia/domain/types/user';
import { RoomVote, Vote } from '@mafia/domain/types/vote';
import { Namespace, Socket } from 'socket.io';
import { JOB_ARR } from '../constants/job';
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
      publishVictim(namespace);
    }

    const remainSecond = interval - (counter % interval);
    namespace.emit(TIMER, remainSecond);

    counter += 1;
  }, 1000);
};

const assignJobs = () => {
  const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

  const mixedArr = shuffle([]);
  const jobs = JOB_ARR[mixedArr.length];

  if (jobs.length <= 0) return false;
  return mixedArr.map((username, idx) => ({ [username]: jobs[idx] }));
};

const gameSocketInit = (
  namespace: Namespace,
  socket: Socket,
  roomId: string,
  playerList: PlayerInfo[],
): void => {
  // assignJobs();

  channelVote[roomId] = {};
  channelUser[roomId] = {};
  resetChannelVote(roomId);
  console.log(playerList);
  assignJobs();
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

  socket.on(READY, (userInfo: { userName: string; isReady: boolean; isHost: boolean }) => {
    namespace.emit(PUBLISH_READY, userInfo);
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
