import * as EVENT from '@mafia/domain/constants/event';
import { Message, StoryName } from '@mafia/domain/types/chat';
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

  const updateStory = ({
    userName,
    storyName,
    isMafia,
    mafiaList,
  }: {
    userName?: string;
    storyName: StoryName;
    isMafia?: boolean;
    mafiaList?: string[];
  }) => {
    if (!storyName) return;
    if (storyName === 'EXECUTION' && !userName) {
      return;
    }
    if (storyName === 'PUBLISH_VICTIM' && !userName) {
      return;
    }
    if (storyName === 'PUBLISH_SURVIVOR' && !userName) {
      return;
    }
    if (storyName === 'POLICE_ABILITY' && !userName && !isMafia) {
      return;
    }
    if (storyName === 'NOTICE_MAFIA' && !mafiaList) {
      return;
    }

    const storyType = STORY_DICTIONARY[storyName];

    const story: Story = {
      id: Date.now().toString(),
      msg: storyType?.msg(userName, isMafia, mafiaList),
      imgSrc: storyType?.imgSrc,
      type: storyType?.type,
    };

    setChatList((prev) => [...prev, story]);
  };

  useEffect(() => {
    socketRef.current?.on(EVENT.PUBLISH_MESSAGE, updateChatList);
    socketRef.current?.on(EVENT.EXECUTION, updateStory);
    socketRef.current?.on(EVENT.PUBLISH_VICTIM, updateStory);
    socketRef.current?.on(EVENT.PUBLISH_SURVIVOR, updateStory);
    socketRef.current?.on(EVENT.POLICE_ABILITY, updateStory);
    socketRef.current?.on(EVENT.PUBLISH_JOB, updateStory);
    socketRef.current?.on(EVENT.NOTICE_MAFIA, updateStory);

    return () => {
      socketRef.current?.off(EVENT.PUBLISH_MESSAGE, updateChatList);
      socketRef.current?.off(EVENT.EXECUTION, updateStory);
      socketRef.current?.off(EVENT.PUBLISH_VICTIM, updateStory);
      socketRef.current?.off(EVENT.PUBLISH_SURVIVOR, updateStory);
      socketRef.current?.off(EVENT.POLICE_ABILITY, updateStory);
      socketRef.current?.off(EVENT.PUBLISH_JOB, updateStory);
      socketRef.current?.off(EVENT.NOTICE_MAFIA, updateStory);
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
