/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../../domain/types/user';
import { primaryDark } from '../../constants/index';
import ChatContainer from '../../containers/ChatContainer';
import LeftSideContainer from '../../containers/LeftSideContainer';
import useChat from '../../hooks/useChat';

const Game = () => {
  const myName = useRef(uuidv4());
  const ROOM_ID = 'hi';
  const { chatList, sendChat } = useChat(ROOM_ID);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer roomId={ROOM_ID} />
      <ChatContainer chatList={chatList} sendChat={sendChat} myName={myName.current} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;

  height: 100vh;
  background-color: ${primaryDark};
`;

export default Game;
