import { Namespace, Socket } from 'socket.io';
import { ChatMsgType } from '../../../domain/types/chat';

const RECEIVE_MESSAGE = 'send msg';
const BROADCAST_MESSAGE = 'receive msg';

const chatSocketInit = (namespace: Namespace, socket: Socket, roomId: string) => {
  socket.on(RECEIVE_MESSAGE, (chat: ChatMsgType) => {
    namespace.to(roomId).emit(BROADCAST_MESSAGE, chat);
  });
};

export default chatSocketInit;
