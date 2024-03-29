import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  primaryLight,
  primaryDark,
  white,
  titleActive,
  grey1,
  grey2,
  mafiaMyMessage,
  mafiaOtherMessage,
} from '@constants/index';
import { Message } from '@mafia/domain/types/chat';

interface PropType {
  chat: Message;
  isMyMsg: boolean;
}

const ChatMsg: FC<PropType> = ({ chat, isMyMsg }) => (
  <div css={msgContainerStyle(isMyMsg)}>
    <div className="profile">
      <img css={profileImgStyle} src={chat.profileImg} alt="profile" />
      <span>{chat.userName}</span>
    </div>
    <div css={msgStyle(isMyMsg, chat.isDead, chat.isMafia)}>{chat.msg}</div>
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

const msgStyle = (isMyMsg: boolean, isDead: boolean, isMafia: boolean) => css`
  max-width: 65%;
  padding: 14px;
  font-size: 16px;
  line-height: 23px;
  border-radius: 20px;

  border: 'none';
  word-break: break-word;
  color: ${isMyMsg ? white : titleActive};
  border-top-right-radius: ${isMyMsg ? 0 : '20px'};
  border-bottom-left-radius: ${isMyMsg ? '20px' : 0};
  background-color: ${isMyMsg ? primaryDark : primaryLight};

  ${isMafia ? mafiaMsgStyle(isMyMsg) : ''}
  ${isDead ? deadMsgStyle(isMyMsg) : ''}
`;

const deadMsgStyle = (isMyMsg: boolean = false) => css`
  color: ${grey2};
  border: 1px solid ${isMyMsg ? primaryDark : grey1};
  background-color: transparent;
`;

const mafiaMsgStyle = (isMyMsg: boolean = false) => css`
  background-color: ${isMyMsg ? mafiaMyMessage : mafiaOtherMessage};
`;

export default ChatMsg;
