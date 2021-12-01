import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { white, titleActive } from '@constants/index';
import ChatMsgList from '@src/lists/ChatMsgList';
import useLog from '@src/hooks/useLog';
import ChatForm from '@src/components/form/ChatForm';

interface PropType {
  isNight: boolean;
}

const ChatContainer: FC<PropType> = ({ isNight }) => {
  const { logs, sendChat } = useLog();

  return (
    <div css={chatContainerStyle}>
      <ChatMsgList logs={logs} />
      <ChatForm isNight={isNight} sendChat={sendChat} />
    </div>
  );
};

const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  width: 50%;
  height: 100%;
  padding: 40px;
  gap: 20px;
  color: ${titleActive};
  background-color: ${white};
`;

export default ChatContainer;
