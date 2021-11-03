import { Socket } from 'socket.io';

const RECEIVE_MESSAGE = 'receive msg';
const BROADCAST_MESSAGE = 'receive msg';

const chatSocketInit = (socket: Socket, roomId: string) => {
  socket.on(RECEIVE_MESSAGE, () => {
    socket.broadcast.to(roomId).emit(BROADCAST_MESSAGE);
  });
};

export default chatSocketInit;
