import { Namespace, Socket } from 'socket.io';
import { Vote } from '../../../domain/types/vote';

const gameSocketInit = (namespace: Namespace, socket: Socket, roomId: string): void => {
  socket.on('vote', (vote: Vote) => {
    namespace.to(roomId).emit('publish vote', vote);
  });
};

export default gameSocketInit;
