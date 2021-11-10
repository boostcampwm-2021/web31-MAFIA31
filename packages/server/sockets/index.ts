import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';
import gameSocketInit from './game';

// export interface RoomInfo {
//   roomId: string;
//   title: string;
//   host: string;
// }

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
