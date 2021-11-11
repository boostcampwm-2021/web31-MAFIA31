import { MESSAGE, PUBLISH_MESSAGE } from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { Namespace, Socket } from 'socket.io';

const chatSocketInit = (namespace: Namespace, socket: Socket) => {
  socket.on(MESSAGE, (chat: Message) => {
    namespace.emit(PUBLISH_MESSAGE, chat);
  });
};

export default chatSocketInit;
