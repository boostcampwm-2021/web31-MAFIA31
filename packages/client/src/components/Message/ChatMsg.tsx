import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChatMsgType } from '../../types/ChatTypes';

interface PropType {
  chat: ChatMsgType;
  isMyMsg: boolean;
}

const msg = css`
  padding: 12px;
  color: red;
`;

const ChatMsg: FC<PropType> = ({ chat, isMyMsg }) => (
  <div css={msg}>
    {chat.msg}
    {isMyMsg}
  </div>
);
export default ChatMsg;
