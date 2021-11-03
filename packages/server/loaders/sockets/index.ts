import { Namespace, Socket } from 'socket.io';
import chatSocketInit from './chat';

const socketInit = (namespace: Namespace) => {
  namespace.on('connection', (socket: Socket) => {
    chatSocketInit(socket);

    namespace.on('disconnect', () => {});
  });
};

export default socketInit;
