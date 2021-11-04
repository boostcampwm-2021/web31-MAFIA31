import { Namespace, Socket } from 'socket.io';
import { GameResult, Job } from '../../../domain/types/game';
import { RoomVote, Vote } from '../../../domain/types/vote';
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

const GAME_OVER = 'game over';
// const GAME_START = 'game start';
const TIMER = 'timer';
const TURN_CHANGE = 'turn change';
const VOTE = 'vote';
const PUBLISH_VOTE = 'publish vote';

const channelUser: ChannelUser = { hi: { user1: {}, user2: {}, user3: {} } };
const channelVote: ChannelVote = {};
const getChannelVote = (roomId: string) => channelVote[roomId];
const getChannelUser = (roomId: string) => channelUser[roomId];

const resetChannelVote = (roomId: string) => {
  Object.keys(channelUser[roomId]).forEach((user) => {
    channelVote[roomId][user] = 0;
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

const gameSocketInit = (namespace: Namespace, socket: Socket, roomId: string): void => {
  channelVote[roomId] = {};
  resetChannelVote(roomId);

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

  socket.on(VOTE, ({ to: userName }: Vote) => {
    if (!canVote()) return;

    channelVote[roomId][userName] += 1;
    namespace.to(roomId).emit(PUBLISH_VOTE, channelVote[roomId]);
  });

  // socket.on(GAME_START, () => {
  let counter = 0;
  const interval = 60;
  let isNight: boolean = true;

  const gameInterval = setInterval(() => {
    if (counter % interval === 0) {
      if (checkEnd(dashBoard)) {
        namespace.to(roomId).emit(GAME_OVER, getGameResult(dashBoard, jobAssignment));
        clearInterval(gameInterval);

        return;
      }

      isNight = !isNight;
      if (!isNight) {
        startVoteTime(namespace, roomId, 10000);
      }
      namespace.to(roomId).emit(TURN_CHANGE, isNight);
    }

    const remainSecond = interval - (counter % interval);
    namespace.to(roomId).emit(TIMER, remainSecond);

    counter += 1;
  }, 1000);
  // });
};

export { resetChannelVote, getChannelUser, getChannelVote };

export default gameSocketInit;
