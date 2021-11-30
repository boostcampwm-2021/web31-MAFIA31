import { PlayerInfo } from '@mafia/domain/types/user';
import apiClient from '../axios/apiClient';
import GameStore from './GameStore';

interface RoomStoreType {
  [roomId: string]: PlayerInfo[];
}

class RoomStore {
  static instance: RoomStoreType = {};

  constructor() {
    throw new Error('This is Singleton Class! Use getInstance()');
  }

  static getInstance() {
    return RoomStore.instance;
  }

  static initRoom(roomId: string) {
    if (!RoomStore.instance[roomId]) {
      RoomStore.instance[roomId] = [];
    }
  }

  static removeRoom(roomId: string) {
    delete RoomStore.instance[roomId];
  }

  static pushPlayer(roomId: string, player: PlayerInfo) {
    const existingPlayer = RoomStore.instance[roomId].find(
      ({ socketId, userName }) => socketId === player.socketId || userName === player.userName,
    );

    if (existingPlayer) return; // TODO: throw Error() 발생시켜주고, client에서는 Redirect 시켜주기!
    RoomStore.instance[roomId].push(player);
  }

  static async removePlayer(roomId: string, socketId: string) {
    RoomStore.instance[roomId] = RoomStore.instance[roomId].filter(
      (user) => user.socketId !== socketId,
    );

    if (RoomStore.instance[roomId].length <= 0) {
      GameStore.clearTimer(roomId);
      GameStore.removeGameInfos(roomId);
      RoomStore.removeRoom(roomId);
      await apiClient.put(`/rooms`, {
        roomId: roomId.split('/')[1],
        status: 'ready',
      });
      return;
    }
    RoomStore.instance[roomId][0].isHost = true;
    RoomStore.instance[roomId][0].isReady = true;
  }

  static get(roomId: string) {
    RoomStore.initRoom(roomId);
    return RoomStore.instance[roomId];
  }
}

export default RoomStore;
