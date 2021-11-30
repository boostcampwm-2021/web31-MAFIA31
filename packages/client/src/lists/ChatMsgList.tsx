/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Message } from '@mafia/domain/types/chat';
import { ChatMsg, StoryMsg } from '@src/components/Message';
import { useUserInfo } from '@src/contexts/userInfo';
import { Story } from '@src/types';
import { FC, useEffect, useRef } from 'react';

interface PropType {
  logs: (Message | Story)[];
}

function isStory(data: Message | Story): data is Story {
  return (data as Story).imgSrc !== undefined;
}

const ChatMsgList: FC<PropType> = ({ logs }) => {
  const chatMsgsRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!chatMsgsRef.current) return;
    chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight;
  }, [logs]);

  return (
    <div css={chatMsgsStyle} ref={chatMsgsRef}>
      {logs.map((el) =>
        isStory(el) ? (
          <StoryMsg key={el.id} story={el} />
        ) : (
          <ChatMsg key={el.id} chat={el} isMyMsg={userInfo?.userName === el.userName} />
        ),
      )}
    </div>
  );
};

const chatMsgsStyle = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none;

  width: 100%;
  gap: 16px;
  font-size: 16px;
  line-height: 23px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default ChatMsgList;
