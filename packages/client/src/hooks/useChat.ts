import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMsgType } from '../../../domain/types/chat';

const RECEIVE_MESSAGE = 'receive msg';
const SOCKET_SERVER_URL = 'localhost:5001/';

const useChat = (roomId: string) => {
  const [chatList, setChatList] = useState<ChatMsgType[]>([]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(RECEIVE_MESSAGE, (msg: ChatMsgType): void => {
      setChatList((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  const sendChat = (msg: ChatMsgType): void => {
    socketRef.current?.emit('send msg', msg);
  };

  return { chatList, sendChat };
};

export default useChat;
