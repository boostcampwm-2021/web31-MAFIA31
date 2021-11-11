import { PlayerInfo } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
import dummy from './dummy';
import gameSocketInit from './game';

interface RoomStore {
  [roomId: string]: PlayerInfo[];
}

const roomStore: RoomStore = {};

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { nsp } = socket;
    const { name: roomId } = nsp;
    if (!roomId) return;
    roomStore[roomId] = dummy;

    chatSocketInit(nsp, socket);
    // const gameInfo[roomId]  = jobAssign(roomStore[roomId])
    gameSocketInit(nsp, socket, roomId, roomStore[roomId]);
  });
};

export default socketInit;
