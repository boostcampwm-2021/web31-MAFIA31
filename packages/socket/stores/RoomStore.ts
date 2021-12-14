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

    if (existingPlayer) {
      existingPlayer.socketId = player.socketId;
      existingPlayer.isReady = player.isReady;
      existingPlayer.isHost = player.isHost;
    } else {
      RoomStore.instance[roomId].push(player);
    }
  }

  static async removePlayer(roomId: string, socketId: string) {
    const newRoomStore = RoomStore.get(roomId).filter((user) => user.socketId !== socketId);

    if (newRoomStore.length > 0) {
      RoomStore.instance[roomId] = newRoomStore;
      RoomStore.instance[roomId][0].isHost = true;
      RoomStore.instance[roomId][0].isReady = true;
      return;
    }

    GameStore.clearTimer(roomId);
    GameStore.removeGameInfos(roomId);
    RoomStore.removeRoom(roomId);
    await apiClient.put(`/rooms`, {
      roomId: roomId.split('/')[1],
      status: 'ready',
    });
  }

  static get(roomId: string) {
    RoomStore.initRoom(roomId);
    return RoomStore.instance[roomId];
  }
}

export default RoomStore;
