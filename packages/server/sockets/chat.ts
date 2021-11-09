import { MESSAGE, PUBLISH_MESSAGE } from 'domain/constants/event';
import { ChatMsgType } from 'domain/types/chat';
import { Namespace, Socket } from 'socket.io';

const chatSocketInit = (namespace: Namespace, socket: Socket, roomId: string) => {
  socket.on(MESSAGE, (chat: ChatMsgType) => {
    namespace.to(roomId).emit(PUBLISH_MESSAGE, chat);
  });
};

export default chatSocketInit;
