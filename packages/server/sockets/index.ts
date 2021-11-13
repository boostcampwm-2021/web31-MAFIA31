import { PlayerInfo } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import RoomStore from '../stores/RoomStore';
import { abilitySocketInit } from './ability';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { name: roomId } = socket.nsp;

    if (!roomId) {
      return;
    }
    RoomStore.initRoom(roomId);

    socket.on('join', (userName: string) => {
      const isHost: boolean = RoomStore.get(roomId).length === 0;
      const isReady: boolean = isHost;
      const newUser: PlayerInfo = {
        userName,
        socketId: socket.id,
        isReady,
        isHost,
      };

      RoomStore.pushPlayer(roomId, newUser);
      console.log(`👋 ${userName} joined ${roomId}.`, RoomStore.get(roomId));
      socket.nsp.emit('join', RoomStore.get(roomId));
    });

    socket.on('disconnect', () => {
      console.log(`👋 ${socket.id} exit from ${roomId}.`);
      RoomStore.removePlayer(roomId, socket.id);
    });

    chatSocketInit(socket);
    gameSocketInit(socket);
    abilitySocketInit(socket);
  });
};

export default socketInit;
