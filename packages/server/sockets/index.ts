import { JOIN, PUBLISH_JOIN, PUBLISH_LEAVE } from '@mafia/domain/constants/event';
import { PlayerInfo, User } from '@mafia/domain/types/user';
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

    socket.on(JOIN, ({ userName, profileImg }: User) => {
      if (!userName || !profileImg) return; // TODO: throw Error;

      const isHost: boolean = RoomStore.get(roomId).length === 0;
      const isReady: boolean = isHost;
      const newUser: PlayerInfo = {
        socketId: socket.id,
        profileImg,
        userName,
        isReady,
        isHost,
      };

      RoomStore.pushPlayer(roomId, newUser);
      console.log(`👋 ${userName} joined ${roomId}.`, RoomStore.get(roomId));
      socket.nsp.emit(PUBLISH_JOIN, RoomStore.get(roomId));
    });

    socket.on('disconnect', () => {
      console.log(`👋 ${socket.id} exit from ${roomId}.`);
      RoomStore.removePlayer(roomId, socket.id);
      socket.nsp.emit(PUBLISH_LEAVE, RoomStore.get(roomId));
    });

    chatSocketInit(socket);
    gameSocketInit(socket);
    abilitySocketInit(socket);
  });
};

export default socketInit;
