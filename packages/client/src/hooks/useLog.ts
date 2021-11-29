import * as EVENT from '@mafia/domain/constants/event';
import { Message } from '@mafia/domain/types/chat';
import { useSocketContext } from '@src/contexts/socket';
import { Event, Story } from '@src/types';
import { useState } from 'react';
import useSocketEvent from './useSocketEvent';

const useLog = () => {
  const { socketRef } = useSocketContext();
  const [logs, setLogs] = useState<(Message | Story)[]>([]);

  const updateLogs = (log: Message | Story) => {
    setLogs((prev) => [...prev, log]);
  };

  const chatEvent: Event = { event: EVENT.PUBLISH_MESSAGE, handler: updateLogs };
  const storyEvent: Event = { event: EVENT.PUBLISH_STORY, handler: updateLogs };
  const noticeMafiasEvent: Event = { event: EVENT.NOTICE_MAFIA, handler: updateLogs };
  useSocketEvent(socketRef, [chatEvent, storyEvent, noticeMafiasEvent]);

  const sendChat = (chat: Message, isNight: boolean) => {
    if (!chat.msg) return;
    if (!isNight) {
      socketRef.current?.emit(EVENT.MESSAGE, chat);
      return;
    }

    socketRef.current?.emit(EVENT.NIGHT_MESSAGE, chat);
  };

  return { logs, sendChat };
};

export default useLog;
