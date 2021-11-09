import { MESSAGE, PUBLISH_MESSAGE } from 'domain/constants/event';
import { ChatMsgType } from 'domain/types/chat';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

const useChat = (socket: Socket) => {
  const [chatList, setChatList] = useState<ChatMsgType[]>([]);

  useEffect(() => {
    socket.on(PUBLISH_MESSAGE, (msg: ChatMsgType): void => {
      setChatList((prev) => [...prev, msg]);
    });
  }, [socket]);

  const sendChat = (msg: ChatMsgType): void => {
    socket?.emit(MESSAGE, msg);
  };

  return { chatList, sendChat };
};

export default useChat;
