import { MESSAGE, PUBLISH_MESSAGE } from 'domain/constants/event';
import { ChatMsgType } from 'domain/types/chat';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useChat = (roomId: string) => {
  const [chatList, setChatList] = useState<ChatMsgType[]>([]);
  const socketRef = useRef<Socket | null>();

  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001';

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on(PUBLISH_MESSAGE, (msg: ChatMsgType): void => {
      setChatList((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  const sendChat = (msg: ChatMsgType): void => {
    if (msg.msg === '') return;
    socketRef.current?.emit(MESSAGE, msg);
  };

  return { chatList, sendChat };
};

export default useChat;
