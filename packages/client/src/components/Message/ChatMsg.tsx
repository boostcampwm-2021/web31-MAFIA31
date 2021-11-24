import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { primaryLight, primaryDark, white, titleActive, grey1, grey2 } from '@constants/index';

interface PropType {
  userName: string;
  profileImg: string;
  msg: string;
  isMyMsg: boolean;
  isDead: boolean | undefined;
}

const ChatMsg: FC<PropType> = ({ userName, profileImg, msg, isMyMsg, isDead = false }) => (
  <div css={msgContainerStyle(isMyMsg)}>
    <div className="profile">
      <img css={profileImgStyle} src={profileImg} alt="profile" />
      <span>{userName}</span>
    </div>
    <div css={msgStyle(isMyMsg, isDead)}>{msg}</div>
  </div>
);

const msgContainerStyle = (isMyMsg: boolean) => css`
  display: flex;
  align-items: flex-end;
  justify-content: ${isMyMsg ? 'flex-end' : 'flex-start'};

  width: 100%;
  gap: 16px;

  .profile {
    display: ${isMyMsg ? 'none' : 'flex'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 3px;
    width: 50px;
    max-width: 50px;

    span {
      display: block;
      overflow: hidden;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;

      width: 50px;
      font-size: 10px;
      line-height: 10px;
    }
  }
`;

const profileImgStyle = css`
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  border: 2px solid ${titleActive};
`;

const msgStyle = (isMyMsg: boolean, isDead: boolean) => css`
  max-width: 65%;
  padding: 14px;
  font-size: 16px;
  line-height: 23px;
  border-radius: 20px;
  word-break: break-word;
  color: ${isDead ? grey2 : isMyMsg ? white : titleActive};
  border: ${isDead ? `1px solid ${isMyMsg ? primaryDark : grey1}` : 'none'};
  background-color: ${isDead ? 'transparent' : isMyMsg ? primaryDark : primaryLight};
  border-top-right-radius: ${isMyMsg ? 0 : '20px'};
  border-bottom-left-radius: ${isMyMsg ? '20px' : 0};
`;

export default ChatMsg;
