import * as EVENT from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
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
  const updateVictimStory = (userName: string) => {
    if (userName) {
      console.log(userName);
      const storyType = userName ? STORY_DICTIONARY.PUBLISH_VICTIM : STORY_DICTIONARY.NO_KILL;
      const story: Story = {
        id: Date.now().toString(),
        msg: storyType?.msg(userName),
        imgSrc: storyType?.imgSrc,
      };
      setChatList((prev) => [...prev, story]);
    }
  };

  const updateVoteStory = (userName: string) => {
    if (userName) {
      const storyType = STORY_DICTIONARY.EXECUTION;
      const story: Story = {
        id: Date.now().toString(),
        msg: storyType?.msg(userName),
        imgSrc: storyType?.imgSrc,
      };
      setChatList((prev) => [...prev, story]);
    }
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_MESSAGE, updateChatList);
    socketRef.current?.on(EVENT.EXECUTION, updateVoteStory);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updateVictimStory);

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_MESSAGE, updateChatList);
      socketRef.current?.off(EVENT.EXECUTION, updateVoteStory);
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
