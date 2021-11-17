import { GameInfo, PlayerResult } from '@mafia/domain/types/game';
import { RoomVote, Vote } from '@mafia/domain/types/vote';

interface GameStoreType {
  [roomId: string]: GameInfo[];
}

interface DashBoard {
  mafia: number;
  citizen: number;
}

class GameStore {
  static instance: GameStoreType = {};

  constructor() {
    throw new Error('This is Singleton Class! Use getInstance()');
  }

  static getInstance() {
    return GameStore.instance;
  }

  static resetGame(roomId: string) {
    GameStore.instance[roomId] = [];
  }

  static initGame(roomId: string, gameInfoList: GameInfo[] = []) {
    GameStore.instance[roomId] = gameInfoList;
  }

  static resetVote(roomId: string) {
    GameStore.instance[roomId].map((gameInfo) => ({ ...gameInfo, voteFrom: [] }));
  }

  static voteUser(roomId: string, voteInfo: Vote): boolean {
    const { to, from } = voteInfo;
    const votedUser = GameStore.get(roomId)?.find(({ userName }) => to === userName);

    if (!votedUser) return false;
    votedUser.voteFrom.add(from);
    return true;
  }

  static get(roomId: string) {
    return GameStore.instance[roomId];
  }

  static getVoteInfos(roomId: string): RoomVote[] {
    return GameStore.instance[roomId].map(({ userName, profileImg, voteFrom }) => ({
      userName,
      profileImg,
      voteCount: voteFrom.size,
    }));
  }

  static getDashBoard(roomId: string): DashBoard {
    const mafia = GameStore.instance[roomId].filter(
      ({ isDead, job }) => !isDead && job === 'mafia',
    ).length;
    const citizen = GameStore.instance[roomId].filter(
      ({ isDead, job }) => !isDead && job !== 'mafia',
    ).length;

    return { mafia, citizen };
  }

  static getGameResult(roomId: string, win: string): PlayerResult[] {
    return GameStore.instance[roomId].map(({ userName, job }) => ({
      userName,
      job,
      result: (win === 'citizen' && job !== 'mafia') || win === job,
    }));
  }
}

export default GameStore;
