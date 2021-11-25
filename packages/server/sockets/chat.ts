import { MESSAGE, NIGHT_MESSAGE, PUBLISH_MESSAGE } from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

const ALIVE = false;
const DEAD = true;

const chatSocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;
  const { name: roomId } = namespace;

  socket.on(MESSAGE, (chat: Message) => {
    const state = GameStore.getPlayerState(roomId, chat.userName);

    if (state === undefined) return;
    if (state === ALIVE) {
      namespace.emit(PUBLISH_MESSAGE, { ...chat, isDead: false });
    } else if (state === DEAD) {
      namespace.to('dead').emit(PUBLISH_MESSAGE, { ...chat, isDead: true });
    }
  });

  socket.on(NIGHT_MESSAGE, ({ msg, roomName }) => {
    console.log('night message', msg);
    namespace.to(roomName).emit(PUBLISH_MESSAGE, msg);
  });
};

export default chatSocketInit;
