import React, { FC, useCallback, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useUserInfo } from '@src/contexts/userInfo';
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import { ButtonSizeList, ButtonThemeList, IconButton } from '../Button';
import { SendIcon } from '../Icon';

interface PropType {
  isNight: boolean;
  sendChat: any;
}

const ChatForm: FC<PropType> = ({ isNight, sendChat }) => {
  const [inputValue, setInputValue] = useState('');
  const { userInfo } = useUserInfo();
  const canNightChat = () => true; // 밤에 채팅 보낼 수 있는 직업인지 확인
  const sendMessage = useCallback(() => {
    if (isNight && !canNightChat()) return;

    const message = {
      id: `${Date.now()}${userInfo?.userName}`,
      userName: userInfo?.userName,
      msg: inputValue,
      profileImg: userInfo?.profileImg,
    };

    sendChat(message, isNight);
    setInputValue('');
  }, [inputValue, isNight]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter') return;
      sendMessage();
      event.preventDefault();
    },
    [inputValue, isNight],
  );

  const updateInputMsg = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(target.value);

  return (
    <form css={inputFormStyle(isNight)}>
      <input
        css={inputStyle(isNight)}
        placeholder="메세지를 입력하세요"
        value={inputValue}
        onChange={updateInputMsg}
        onKeyPress={handleKeyPress}
      />
      <IconButton
        icon={SendIcon}
        size={ButtonSizeList.MEDIUM}
        theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
        onClick={sendMessage}
      />
    </form>
  );
};

const inputFormStyle = (isNight: boolean) => css`
  display: flex;
  align-content: center;

  gap: 18px;
  width: 100%;
  padding: 11px 16px;
  border-radius: 20px;
  background-color: ${isNight ? primaryDark : primaryLight};
`;

const inputStyle = (isNight: boolean) => css`
  width: 100%;
  font-size: 18px;
  line-height: 21px;

  border: none;
  background-color: transparent;
  color: ${isNight ? white : titleActive};

  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${isNight ? 'rgba(255, 255, 255, 0.6)' : 'rgba(60, 60, 60, 0.6)'};
  }
`;

export default ChatForm;
