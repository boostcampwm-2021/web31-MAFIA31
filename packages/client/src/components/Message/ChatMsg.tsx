import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { primaryLight, primaryDark, white, titleActive } from '@constants/index';

interface PropType {
  msg: string;
  isMyMsg: boolean;
}

const ChatMsg: FC<PropType> = ({ msg, isMyMsg }) => (
  <div css={msgContainerStyle(isMyMsg)}>
    <img css={profileImgStyle(isMyMsg)} src="/assets/icons/profile.svg" alt="profile" />
    <div css={msgStyle(isMyMsg)}>{msg}</div>
  </div>
);

const msgContainerStyle = (isMyMsg: boolean) => css`
  display: flex;
  align-items: flex-end;
  justify-content: ${isMyMsg ? 'flex-end' : 'flex-start'};

  width: 100%;
  gap: 16px;
`;

const profileImgStyle = (isMyMsg: boolean) => css`
  display: ${isMyMsg ? 'none' : 'inline'};

  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  border: 2px solid ${titleActive};
`;

const msgStyle = (isMyMsg: boolean) => css`
  max-width: 65%;
  padding: 14px;
  font-size: 16px;
  line-height: 23px;
  border-radius: 20px;
  color: ${isMyMsg ? white : titleActive};
  background-color: ${isMyMsg ? primaryDark : primaryLight};
  border-top-right-radius: ${isMyMsg ? 0 : '20px'};
  border-bottom-left-radius: ${isMyMsg ? '20px' : 0};
`;

export default ChatMsg;
