import {
  MESSAGE,
  NIGHT_MESSAGE,
  PUBLISH_MESSAGE,
  PUBLISH_VICTIM,
} from '@mafia/domain/constants/event';
import { STORY_DICTIONARY } from '@src/constants/story';
import { MessageClient, Story } from '@src/types';
import { useEffect, useState } from 'react';

const useChat = (socketRef: any) => {
  const [chatList, setChatList] = useState<(MessageClient | Story)[]>([]);

  const updateChatList = (msg: MessageClient): void => {
    setChatList((prev) => [...prev, msg]);
  };
  const updateVictimStory = (victim: string): void => {
    const story = STORY_DICTIONARY.KILLED;
    setChatList((prev) => [
      ...prev,
      { id: Date.now().toString(), msg: story?.msg(victim), imgSrc: story?.imgSrc, isStory: true },
    ]);
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_MESSAGE, updateChatList);

    return () => {
      socketRef.current.off(PUBLISH_MESSAGE, updateChatList);
    };
  }, [socketRef.current]);

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VICTIM, updateVictimStory);

    return () => {
      socketRef.current.off(PUBLISH_VICTIM, updateVictimStory);
    };
  }, [socketRef.current]);

  const sendChat = (msg: MessageClient): void => {
    if (!msg.msg) return;
    socketRef.current?.emit(MESSAGE, msg);
  };

  const sendNightChat = (msg: MessageClient, roomName: string): void => {
    if (!msg.msg) return;
    socketRef.current.emit(NIGHT_MESSAGE, { msg, roomName });
  };

  return { chatList, sendChat, sendNightChat };
};

export default useChat;
