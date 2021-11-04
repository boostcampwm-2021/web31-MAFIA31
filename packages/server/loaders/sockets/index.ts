import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
import gameSocketInit from './game';

const socketInit = (namespace: Namespace): void => {
  namespace.on('connection', (socket: Socket): void => {
    const { roomId }: { roomId?: string } = socket.handshake.query;
    if (!roomId) return;

    socket.join(roomId);
    chatSocketInit(namespace, socket, roomId);
    gameSocketInit(namespace, socket, roomId);

    socket.on('disconnect', (): void => {});
  });
};

export default socketInit;
