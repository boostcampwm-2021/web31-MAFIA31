import { FC, useCallback, useState, useRef, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { ChatMsg } from '@components/Message';
import { ChatMsgType } from 'domain/types/chat';
import { primaryLight, primaryDark, white, titleActive } from '@constants/index';

interface PropType {
  chatList: ChatMsgType[];
  sendChat: any;
}

const ChatContainer: FC<PropType> = ({ chatList, sendChat }) => {
  const myName = 'user1';
  const isDark = true;
  const [inputValue, setInputValue] = useState('');
  const chatMsgsRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback(() => {
    sendChat({ id: Date.now() + myName, userName: myName, msg: inputValue, profileImg: '' });
    setInputValue('');
  }, [inputValue]);

  useEffect(() => {
    if (!chatMsgsRef.current) return;
    chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight;
  }, [chatList]);

  return (
    <div css={chatContainerStyle}>
      <div css={chatMsgsStyle} ref={chatMsgsRef}>
        {chatList.map((chat) => (
          <ChatMsg key={chat.id} chat={chat} isMyMsg={myName === chat.userName} />
        ))}
      </div>
      <form css={inputFormStyle(isDark)}>
        <input
          css={inputStyle(isDark)}
          placeholder="메세지를 입력하세요"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />
        <button type="button" css={inputButtonStyle} onClick={onClick}>
          <img src="/assets/icons/send(light).png" alt="send" />
        </button>
      </form>
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
  background-color: ${white};
`;

const chatMsgsStyle = css`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;

  width: 100%;
  /* height: 100%; */
  gap: 16px;
  font-size: 16px;
  line-height: 23px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const inputFormStyle = (isDark: boolean) => css`
  display: flex;

  gap: 18px;
  width: 100%;
  height: 50px;
  padding: 11px 16px;
  border-radius: 20px;
  background-color: ${isDark ? primaryDark : primaryLight};
`;

const inputStyle = (isDark: boolean) => css`
  width: 100%;
  font-size: 18px;
  line-height: 21px;

  border: none;
  background-color: transparent;
  color: ${isDark ? white : titleActive};

  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : titleActive};
  }
`;

const inputButtonStyle = css`
  cursor: pointer;
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: transparent;

  width: 25px;
  height: 25px;
`;

export default ChatContainer;
