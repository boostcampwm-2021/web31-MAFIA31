import { PlayerInfo } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import RoomStore from '../stores/RoomStore';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const mockPlayers = [
  {
    userName: 'binimini',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
  {
    userName: 'donggoolosori',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
  {
    userName: 'Kim-Hyunj',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
  {
    userName: 'test',
    socketId: '그냥 임의 값!',
    isReady: true,
    isHost: false,
    isDead: false,
    job: '',
    voteFrom: [],
  },
];

const socketInit = (namespace: Namespace): void => {
  const { data: roomStore } = RoomStore.getInstance();

  namespace.on('connection', (socket: Socket): void => {
    const { nsp } = socket;
    const { name: roomId } = nsp;

    if (!roomId) {
      return;
    }
    if (!roomStore[roomId]) {
      roomStore[roomId] = [...mockPlayers];
    }

    socket.on('join', (userName: string) => {
      console.log('enter join event');
      // const isHost: boolean = roomStore[roomId].length === 0;
      // const isReady: boolean = isHost;
      const newUser: PlayerInfo = {
        userName,
        socketId: socket.id,
        isReady: true,
        isHost: true,
        isDead: false,
        voteFrom: [],
        job: '',
      };

      roomStore[roomId].push(newUser);
      console.log('in join event', roomStore[roomId]);

      namespace.emit('join', roomStore[roomId]);
    });

    socket.on('disconnect', () => {
      roomStore[roomId] = roomStore[roomId]?.filter((user) => user.socketId !== socket.id);
    });

    chatSocketInit(nsp, socket);
    gameSocketInit(nsp, socket, roomId);
  });
};

export default socketInit;
