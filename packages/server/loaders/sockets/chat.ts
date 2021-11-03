import { Socket } from 'socket.io';

const chatSocketInit = (socket: Socket) => {
  socket.on('receive msg', () => {});
};

export default chatSocketInit;
