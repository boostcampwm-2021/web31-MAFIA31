import { PlayerInfo } from '@mafia/domain/types/user';

interface RoomStoreType {
  [roomId: string]: PlayerInfo[];
}

class RoomStore {
  private static instance: RoomStore;
  private static roomStore: RoomStoreType = {};

  static getInstance() {
    if (!RoomStore.instance) {
      RoomStore.instance = new RoomStore();
    }
    return RoomStore.instance;
  }

  get data() {
    return RoomStore.roomStore;
  }
}

export default RoomStore;
