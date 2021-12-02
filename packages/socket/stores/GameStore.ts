import { GameInfo, PlayerResult } from '@mafia/domain/types/game';
import { RoomVote, Vote } from '@mafia/domain/types/vote';

type Timer = ReturnType<typeof setInterval>;

interface GameStoreType {
  [roomId: string]: GameInfo[];
}

interface VictimStore {
  [roomId: string]: string;
}

interface SurvivorStore {
  [roomId: string]: string;
}

interface TimerStore {
  [roomId: string]: Timer;
}

interface DashBoard {
  mafia: number;
  citizen: number;
}

class GameStore {
  static instance: GameStoreType = {};

  static victims: VictimStore = {};

  static survivors: SurvivorStore = {};

  static timers: TimerStore = {};

  private static canInvest: boolean = true;

  constructor() {
    throw new Error('This is Singleton Class! Use getInstance()');
  }

  static getCanInvest() {
    return this.canInvest;
  }

  static setCanInvest(flag: boolean) {
    this.canInvest = flag;
  }

  static getInstance() {
    return GameStore.instance;
  }

  static get(roomId: string) {
    return GameStore.instance[roomId];
  }

  static set(roomId: string, gameInfoList: GameInfo[]) {
    GameStore.instance[roomId] = gameInfoList;
  }

  static getVictim(roomId: string) {
    return GameStore.victims[roomId];
  }

  static getSurvivor(roomId: string) {
    return GameStore.survivors[roomId];
  }

  static setVictim(roomId: string, victim: string) {
    GameStore.victims[roomId] = victim;
  }

  static setSurvivor(roomId: string, survivor: string) {
    GameStore.survivors[roomId] = survivor;
  }

  static setTimer(roomId: string, timer: Timer) {
    GameStore.timers[roomId] = timer;
  }

  static getTimer(roomId: string) {
    return GameStore.timers[roomId];
  }

  static getSocketId(roomId: string, playerName: string | undefined) {
    if (!playerName) return undefined;
    return GameStore.get(roomId)?.find(({ userName }) => userName === playerName)?.socketId;
  }

  static getPlayerInfo(roomId: string, playerName: string | undefined) {
    if (!playerName) return undefined;
    return GameStore.get(roomId)?.find(({ userName }) => playerName === userName);
  }

  static getVoteInfos(roomId: string): RoomVote {
    return GameStore.instance[roomId].reduce((prev: RoomVote, { userName, voteFrom }) => {
      // eslint-disable-next-line no-param-reassign
      prev[userName] = voteFrom.size;
      return prev;
    }, {});
  }

  static getPlayerState(roomId: string, playerName: string) {
    const playerInfo = GameStore.getPlayerInfo(roomId, playerName);
    return playerInfo?.isDead;
  }

  static getPlayerJob(roomId: string, playerName: string) {
    const playerInfo = GameStore.getPlayerInfo(roomId, playerName);
    return playerInfo?.job;
  }

  static isSaved(roomId: string) {
    if (!GameStore.victims[roomId] || !GameStore.survivors[roomId]) {
      return false;
    }
    return GameStore.victims[roomId] === GameStore.survivors[roomId];
  }

  static resetGame(roomId: string) {
    GameStore.instance[roomId] = [];
    GameStore.victims[roomId] = '';
    GameStore.survivors[roomId] = '';
  }

  static initGame(roomId: string, gameInfoList: GameInfo[] = []) {
    GameStore.instance[roomId] = gameInfoList;
    GameStore.victims[roomId] = '';
    GameStore.survivors[roomId] = '';
  }

  static resetSelected(roomId: string) {
    GameStore.victims[roomId] = '';
    GameStore.survivors[roomId] = '';
  }

  static resetVote(roomId: string) {
    const resetVoteGameInfo: GameInfo[] = GameStore.get(roomId)?.map((gameInfo) => ({
      ...gameInfo,
      voteFrom: new Set(),
    }));
    GameStore.set(roomId, resetVoteGameInfo);
  }

  static clearTimer(roomId: string) {
    clearInterval(GameStore.getTimer(roomId));
  }

  static voteUser(roomId: string, voteInfo: Vote): boolean {
    const { to, from } = voteInfo;
    const votedUser = GameStore.getPlayerInfo(roomId, to);
    const votingUser = GameStore.getPlayerInfo(roomId, from);

    if (!votedUser || !votingUser) return false;
    // eslint-disable-next-line no-unused-expressions
    GameStore.get(roomId)?.forEach(({ voteFrom }) => voteFrom.delete(from));
    votedUser.voteFrom.add(from);
    return true;
  }

  static diePlayer(roomId: string, player: string) {
    const gameInfo = GameStore.get(roomId);
    if (!gameInfo) return '';

    const deadPlayer = gameInfo.find(
      ({ userName, socketId }) => userName === player || socketId === player,
    );
    if (!deadPlayer) return '';

    deadPlayer.isDead = true;
    return deadPlayer.userName;
  }

  static getDashBoard(roomId: string): DashBoard {
    const condition = ({ userName, isDead, job }: GameInfo, deadPlayer: string) => {
      const mafiaCondition = !isDead && job === 'mafia';
      const citizenCondition = !isDead && job !== 'mafia';

      if (GameStore.isSaved(roomId)) {
        return [mafiaCondition, citizenCondition];
      }
      return [
        mafiaCondition && userName !== deadPlayer,
        citizenCondition && userName !== deadPlayer,
      ];
    };

    const deadPlayer = GameStore.getVictim(roomId);
    const mafia =
      GameStore.instance[roomId]?.filter((gameInfo) => condition(gameInfo, deadPlayer)[0]).length ||
      0;
    const citizen =
      GameStore.instance[roomId]?.filter((gameInfo) => condition(gameInfo, deadPlayer)[1]).length ||
      0;

    return { mafia, citizen };
  }

  static getGameResult(roomId: string, win: string): PlayerResult[] {
    return GameStore.instance[roomId]?.map(({ userName, job }) => ({
      userName,
      job,
      result: (win === 'citizen' && job !== 'mafia') || win === job,
    }));
  }

  static removeGameInfos(roomId: string) {
    delete GameStore.instance[roomId];
    delete GameStore.victims[roomId];
    delete GameStore.survivors[roomId];
  }
}

export default GameStore;
