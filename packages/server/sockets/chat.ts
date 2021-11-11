import { MESSAGE, PUBLISH_MESSAGE } from '@mafia/domain/constants/event';
import { ChatMsgType } from '@mafia/domain/types/chat';
import { Namespace, Socket } from 'socket.io';

const chatSocketInit = (namespace: Namespace, socket: Socket) => {
  socket.on(MESSAGE, (chat: ChatMsgType) => {
    namespace.emit(PUBLISH_MESSAGE, chat);
  });
};

export default chatSocketInit;
