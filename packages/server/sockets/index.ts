import { PlayerInfo } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
import gameSocketInit from './game';

interface RoomStore {
  [roomId: string]: PlayerInfo[];
}

const roomStore: RoomStore = {};
const mockPlayers = [
  {
    userName: 'dailyco',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
  {
    userName: 'user2',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
  {
    userName: 'user3',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
];

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { nsp } = socket;
    const { name: roomId } = nsp;
    if (!roomId) return;
    const newPlayer: PlayerInfo = {
      userName: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5),
      socketId: socket.id,
      isReady: true,
      isHost: false,
      isDead: false,
      job: '',
      voteFrom: [],
    };
    if (roomStore[roomId]) roomStore[roomId].push(newPlayer);
    else roomStore[roomId] = [newPlayer, ...mockPlayers];

    chatSocketInit(nsp, socket);
    gameSocketInit(nsp, socket, roomId, roomStore[roomId]);

    socket.on('disconnect', (): void => {});
  });
};

export default socketInit;
