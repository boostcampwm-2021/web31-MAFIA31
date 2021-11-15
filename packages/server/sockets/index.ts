import * as EVENT from '@mafia/domain/constants/event';
import { PlayerInfo } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import RoomStore from '../stores/RoomStore';
import { abilitySocketInit } from './ability';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const readyPlayer = (socket: Socket, roomId: string, readyUserName: string) => {
  console.log(readyUserName);
  const readyUser = RoomStore.get(roomId).find(({ userName }) => userName === readyUserName);
  console.log(readyUser);
  if (!readyUser) return;
  readyUser.isReady = !readyUser.isReady;
  socket.nsp.emit(EVENT.PUBLISH_READY, RoomStore.get(roomId));
};

const addPlayer = (socket: Socket, roomId: string, userName: string) => {
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
  socket.nsp.emit(EVENT.JOIN, RoomStore.get(roomId));
};

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { name: roomId } = socket.nsp;

    if (!roomId) {
      return;
    }
    RoomStore.initRoom(roomId);

    socket.on(EVENT.JOIN, (userName: string) => addPlayer(socket, roomId, userName));

    socket.on(EVENT.READY, (userName: string) => readyPlayer(socket, roomId, userName));

    socket.on('disconnect', () => {
      console.log(`👋 ${socket.id} exit from ${roomId}.`);
      RoomStore.removePlayer(roomId, socket.id);
      socket.nsp.emit(EVENT.JOIN, RoomStore.get(roomId));
    });

    chatSocketInit(socket);
    gameSocketInit(socket);
    abilitySocketInit(socket);
  });
};

export default socketInit;
