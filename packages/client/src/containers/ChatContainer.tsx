import { FC, useCallback, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChatMsg } from '../components/Message';
import { ChatMsgType } from '../../../domain/types/chat';
import { primaryLight, primaryDark, white, titleActive } from '../constants/index';

interface PropType {
  chatList: ChatMsgType[];
  sendChat: any;
}

const ChatContainer: FC<PropType> = ({ chatList, sendChat }) => {
  const myName = 'a';
  const isDark = true;
  const [inputValue, setInputValue] = useState('');

  const onClick = useCallback(() => {
    sendChat({ userName: myName, msg: inputValue, profileImg: '' });
    setInputValue('');
  }, [inputValue]);

  return (
    <div css={chatContainerStyle}>
      <div css={chatMsgsStyle}>
        {chatList.map((chat) => (
          <ChatMsg key={chat.userName + chat.msg} chat={chat} isMyMsg={myName === chat.userName} />
        ))}
      </div>
      <form css={inputFormStyle(isDark)}>
        <input
          css={inputStyle(isDark)}
          placeholder="메세지를 입력하세요"
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />
        <button type="button" css={inputButtonStyle(isDark)} onClick={onClick}>
          <img src="/assets/icons/enter.png" alt="enter" />
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
  background-color: ${isDark ? primaryDark : primaryLight};
  border-radius: 20px;
`;

const inputStyle = (isDark: boolean) => css`
  width: 80%;
  height: 50px;
  border: none;
  color: ${isDark ? white : titleActive};
  background-color: ${isDark ? primaryDark : primaryLight};
  font-size: 18px;
  line-height: 21px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${isDark ? white : titleActive};
  }
`;

const inputButtonStyle = (isDark: boolean) => css`
  background-color: ${isDark ? primaryLight : primaryDark};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`;

export default ChatContainer;
