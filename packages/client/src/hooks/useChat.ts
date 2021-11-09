import { MESSAGE, PUBLISH_MESSAGE } from 'domain/constants/event';
import { ChatMsgType } from 'domain/types/chat';
import { useEffect, useState } from 'react';

const useChat = (socketRef: any) => {
  const [chatList, setChatList] = useState<ChatMsgType[]>([]);
  const updateChatList = (msg: ChatMsgType): void => {
    setChatList((prev) => [...prev, msg]);
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_MESSAGE, updateChatList);

    return () => {
      socketRef.current.off(PUBLISH_MESSAGE, updateChatList);
    };
  }, [socketRef.current]);

  const sendChat = (msg: ChatMsgType): void => {
    socketRef.current?.emit(MESSAGE, msg);
  };

  return { chatList, sendChat };
};

export default useChat;
