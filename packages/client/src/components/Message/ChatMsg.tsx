import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChatMsgType } from '../../../../domain/types/chat';
import { primaryLight, primaryDark, white, titleActive } from '../../constants/index';

interface PropType {
  chat: ChatMsgType;
  isMyMsg: boolean;
}

const ChatMsg: FC<PropType> = ({ chat, isMyMsg }) => {
  const PROFILE_IMG_URL = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
  return (
    <div css={msgContainerStyle(isMyMsg)}>
      <img css={profileImgStyle(isMyMsg)} src={PROFILE_IMG_URL} alt="profile" />
      <div css={msgStyle(isMyMsg)}>{chat.msg}</div>
    </div>
  );
};

const msgContainerStyle = (isMyMsg: boolean) => css`
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
  background-color: ${isMyMsg ? primaryDark : primaryLight};
  color: ${isMyMsg ? white : titleActive};
  border-radius: 20px;
  border-top-right-radius: ${isMyMsg ? '0px' : '20px'};
  border-bottom-left-radius: ${isMyMsg ? '20px' : '0px'};
`;

export default ChatMsg;
