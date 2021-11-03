import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const RECEIVE_MESSAGE = 'receive msg';
const SOCKET_SERVER_URL = 'localhost:5001/';

const useChat = (roomId: string) => {
  const [chatList, setChatList] = useState<Object[]>([]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(RECEIVE_MESSAGE, (msg: Object): void => {
      setChatList([...chatList, msg]);
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  const sendChat = (msg: Object): void => {
    socketRef.current?.emit('send msg', msg);
  };

  return { chatList: Array, sendChat };
};

export default useChat;
