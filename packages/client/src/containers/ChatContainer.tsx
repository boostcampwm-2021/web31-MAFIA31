import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChatMsg } from '../components/Message';
import { ChatMsgType } from '../types/ChatTypes';
import colors from '../constants/colors';

const chatContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  height: 100%;
  gap: 20px;
`;

const chatMsgsStyle = css`
  display: flex;
  flex-direction: column;
  width: 610px;
  gap: 16px;
  font-size: 16px;
  line-height: 23px;
`;

const inputFormStyle = (isDark: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 610px;
  height: 50px;
  padding: 11px 16px;
  background-color: ${isDark ? colors.primaryDark : colors.primaryLight};
  border-radius: 20px;
`;

const inputStyle = (isDark: boolean) => css`
  width: 80%;
  height: 50px;
  border: none;
  color: ${isDark ? colors.white : colors.titleActive};
  background-color: ${isDark ? colors.primaryDark : colors.primaryLight};
  font-size: 18px;
  line-height: 21px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${isDark ? colors.white : colors.titleActive};
  }
`;

const inputButtonStyle = (isDark: boolean) => css`
  background-color: ${isDark ? colors.primaryLight : colors.primaryDark};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`;

const ChatContainer: FC = () => {
  const myName = 'a';
  const isDark = true;
  const [chatMsgs] = useState<ChatMsgType[]>([
    {
      userName: 'a',
      msg: 'amfke',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    },
    {
      userName: 'b',
      msg: 'amfkefasfe',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    },
    {
      userName: 'c',
      msg: 'amfkeqlq;q;',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    },
    {
      userName: 'a',
      msg: '추가 채팅',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    },
  ]);

  return (
    <div css={chatContainerStyle}>
      <div css={chatMsgsStyle}>
        {chatMsgs.map((chat) => (
          <ChatMsg key={chat.userName + chat.msg} chat={chat} isMyMsg={myName === chat.userName} />
        ))}
      </div>
      <form css={inputFormStyle(isDark)}>
        <input css={inputStyle(isDark)} placeholder="메세지를 입력하세요" />
        <button type="button" css={inputButtonStyle(isDark)}>
          <img src="/assets/icons/enter.png" alt="enter" />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
