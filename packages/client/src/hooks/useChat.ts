import * as EVENT from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { User } from '@mafia/domain/types/user';
import { STORY_DICTIONARY } from '@src/constants/story';
import { useSocketContext } from '@src/contexts/socket';
import { Story } from '@src/types';
import { useEffect, useState } from 'react';

const useChat = () => {
  const { socketRef } = useSocketContext();
  const [chatList, setChatList] = useState<(Message | Story)[]>([]);
  const updateChatList = (msg: Message): void => {
    setChatList((prev) => [...prev, msg]);
  };
  const updateVictimStory = (victim: string): void => {
    const story = STORY_DICTIONARY.KILLED;
    setChatList((prev) => [
      ...prev,
      { id: Date.now().toString(), msg: story?.msg(victim), imgSrc: story?.imgSrc, isStory: true },
    ]);
  };

  const updateStoryToChatList = ({ userName }: User) => {
    const story: Story = {
      id: Date.now().toString(),
      msg: `${userName}이 죽었어요!`,
      imgSrc: '/assets/images/die-vote.png',
    };
    setChatList((prev) => [...prev, story]);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_MESSAGE, updateChatList);
    socketRef.current?.on(EVENT.EXECUTION, updateStoryToChatList);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updateVictimStory);

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_MESSAGE);
      socketRef.current?.off(EVENT.EXECUTION);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, updateVictimStory);
    };
  }, [socketRef.current]);

  const sendChat = (msg: Message): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(EVENT.MESSAGE, msg);
  };

  const sendNightChat = (msg: Message, roomName: string): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(EVENT.NIGHT_MESSAGE, { msg, roomName });
  };

  return { chatList, sendChat, sendNightChat };
};

export default useChat;
