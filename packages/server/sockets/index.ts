import { PlayerInfo } from 'domain/types/user';
import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
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

    chatSocketInit(nsp, socket);
    // const gameInfo[roomId]  = jobAssign(roomStore[roomId])
    gameSocketInit(nsp, socket, roomId, roomStore[roomId]);

    socket.on('disconnect', (): void => {});
  });
};

export default socketInit;
