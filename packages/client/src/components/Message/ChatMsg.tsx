import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChatMsgType } from '../../types/ChatTypes';
import colors from '../../constants/colors';

interface PropType {
  chat: ChatMsgType;
  isMyMsg: boolean;
}

const msgContainer = (isMyMsg: boolean) => css`
  display: flex;
  align-self: ${isMyMsg ? 'end' : 'start'};
  gap: 16px;
  img {
    width: 48px;
    height: 48px;
  }
`;

const profileImgStyle = (isMyMsg: boolean) => css`
  display: ${isMyMsg ? 'none' : 'inline'};
`;

const msgStyle = (isMyMsg: boolean) => css`
  display: flex;
  max-width: 450px;
  padding: 12px;
  background-color: ${isMyMsg ? colors.primaryDark : colors.primaryLight};
  color: ${isMyMsg ? colors.white : colors.titleActive};
  border-radius: 20px;
  border-top-right-radius: ${isMyMsg ? '0px' : '20px'};
  border-bottom-left-radius: ${isMyMsg ? '20px' : '0px'};
`;

const ChatMsg: FC<PropType> = ({ chat, isMyMsg }) => (
  <div css={msgContainer(isMyMsg)}>
    <img css={profileImgStyle(isMyMsg)} src={chat.profileImg} alt="profile" />
    <div css={msgStyle(isMyMsg)}>{chat.msg}</div>
  </div>
);
export default ChatMsg;
