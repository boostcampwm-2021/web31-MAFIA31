import * as EVENT from '@mafia/domain/constants/event';
import { PlayerInfo, User } from '@mafia/domain/types/user';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';
import RoomStore from '../stores/RoomStore';
import { abilitySocketInit } from './ability';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const readyPlayer = (socket: Socket, roomId: string, readyUserName: string) => {
  const readyUser = RoomStore.get(roomId).find(({ userName }) => userName === readyUserName);
  if (!readyUser) return;
  readyUser.isReady = !readyUser.isReady;
  socket.nsp.emit(EVENT.PUBLISH_READY, RoomStore.get(roomId));
};

const addPlayer = (socket: Socket, roomId: string, { userName, profileImg }: User) => {
  if (!userName || !profileImg) return; // TODO: throw Error;

  const isHost: boolean = RoomStore.get(roomId).length === 0;
  const isReady: boolean = isHost;
  const newUser: PlayerInfo = {
    userName,
    profileImg,
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
    socket.on(EVENT.JOIN, (user: User) => addPlayer(socket, roomId, user));
    socket.on(EVENT.READY, ({ userName }) => readyPlayer(socket, roomId, userName));

    socket.on('disconnect', () => {
      console.log(`👋 ${socket.id} exit from ${roomId}.`);
      RoomStore.removePlayer(roomId, socket.id);
      const exitPlayer = GameStore.diePlayer(roomId, socket.id);
      socket.nsp.emit(EVENT.JOIN, RoomStore.get(roomId));
      socket.nsp.emit(EVENT.EXIT, exitPlayer);
    });

    chatSocketInit(socket);
    gameSocketInit(socket);
    abilitySocketInit(socket);
  });
};

export default socketInit;
