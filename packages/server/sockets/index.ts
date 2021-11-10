import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { nsp } = socket;
    const { name: roomId } = nsp;
    if (!roomId) return;

    chatSocketInit(nsp, socket);
    gameSocketInit(nsp, socket, roomId);

    socket.on('disconnect', (): void => {});
  });
};

export default socketInit;
