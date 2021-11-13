import { MESSAGE, NIGHT_MESSAGE, PUBLISH_MESSAGE } from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { Socket } from 'socket.io';

const chatSocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;

  socket.on(MESSAGE, (chat: Message) => {
    namespace.emit(PUBLISH_MESSAGE, chat);
  });

  socket.on(NIGHT_MESSAGE, ({ msg, roomName }) => {
    console.log('night message', msg);
    namespace.to(roomName).emit(PUBLISH_MESSAGE, msg);
  });
};

export default chatSocketInit;
