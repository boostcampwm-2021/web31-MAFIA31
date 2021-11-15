import { MESSAGE, NIGHT_MESSAGE, PUBLISH_MESSAGE } from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useChat = () => {
  const { socketRef } = useSocketContext();
  const [chatList, setChatList] = useState<Message[]>([]);
  const updateChatList = (msg: Message): void => {
    setChatList((prev) => [...prev, msg]);
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_MESSAGE, updateChatList);

    return () => {
      socketRef.current?.off(PUBLISH_MESSAGE, updateChatList);
    };
  }, [socketRef.current]);

  const sendChat = (msg: Message): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(MESSAGE, msg);
  };

  const sendNightChat = (msg: Message, roomName: string): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(NIGHT_MESSAGE, { msg, roomName });
  };

  return { chatList, sendChat, sendNightChat };
};

export default useChat;
