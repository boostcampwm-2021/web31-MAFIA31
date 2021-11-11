import { PlayerInfo } from '@mafia/domain/types/user';
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

    if (!roomId) {
      return;
    }
    if (!roomStore[roomId]) {
      roomStore[roomId] = [];
    }

    socket.on('join', (userName: string) => {
      const isHost: boolean = roomStore[roomId].length === 0;
      const isReady: boolean = isHost;
      const newUser: PlayerInfo = {
        userName,
        socketId: socket.id,
        isReady,
        isHost,
        isDead: false,
        voteFrom: [],
        job: '',
      };

      roomStore[roomId].push(newUser);

      socket.emit('join', roomStore[roomId]);
    });

    socket.on('disconnect', () => {
      roomStore[roomId] = roomStore[roomId]?.filter((user) => user.socketId !== socket.id);
    });

    chatSocketInit(nsp, socket);

    gameSocketInit(nsp, socket, roomId, roomStore[roomId]);
  });
};

export default socketInit;
