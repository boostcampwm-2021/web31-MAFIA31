import * as EVENT from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { User } from '@mafia/domain/types/user';
import { Story } from '@src/types';
import { useEffect, useState } from 'react';

const useChat = (socketRef: any) => {
  const [chatList, setChatList] = useState<(Message | Story)[]>([]);
  const updateChatList = (msg: Message): void => {
    setChatList((prev) => [...prev, msg]);
  };
  const updateStoryToChatList = ({ userName }: User) => {
    const story: Story = { msg: `${userName}이 죽었어요!`, imgSrc: '/assets/images/die-vote.png' };
    setChatList((prev) => [...prev, story]);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_MESSAGE, updateChatList);
    socketRef.current?.on(EVENT.EXECUTION, updateStoryToChatList);

    return () => {
      socketRef.current.off(EVENT.PUBLISH_MESSAGE);
      socketRef.current.off(EVENT.EXECUTION);
    };
  }, [socketRef.current]);

  const sendChat = (msg: Message): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(EVENT.MESSAGE, msg);
  };

  const sendNightChat = (msg: Message, roomName: string): void => {
    if (!msg.msg) return;
    socketRef.current.emit(EVENT.NIGHT_MESSAGE, { msg, roomName });
  };

  return { chatList, sendChat, sendNightChat };
};

export default useChat;
