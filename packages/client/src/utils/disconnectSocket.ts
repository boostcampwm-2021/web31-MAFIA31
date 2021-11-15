import { useSocketContext } from '@src/contexts/socket';

const disconnectSocket = () => {
  const { socketRef } = useSocketContext();
  if (socketRef.current) {
    socketRef.current.disconnect();
    socketRef.current = undefined;
  }
};

export default disconnectSocket;
