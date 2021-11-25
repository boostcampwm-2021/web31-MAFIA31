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
      namespace.emit(PUBLISH_MESSAGE, { ...chat, isDead: false, isMafia: false });
    } else if (state === DEAD) {
      namespace.to('dead').emit(PUBLISH_MESSAGE, { ...chat, isDead: true, isMafia: false });
    }
  });

  socket.on(NIGHT_MESSAGE, (chat: Message) => {
    const state = GameStore.getPlayerState(roomId, chat.userName);
    const job = GameStore.getPlayerJob(roomId, chat.userName);

    if (state === undefined) return;
    if (state === DEAD) {
      namespace.to('dead').emit(PUBLISH_MESSAGE, { ...chat, isDead: true, isMafia: false });
    } else if (state === ALIVE && job === 'mafia') {
      namespace.to('mafia').emit(PUBLISH_MESSAGE, { ...chat, isDead: false, isMafia: true });
    }
  });
};

export default chatSocketInit;
