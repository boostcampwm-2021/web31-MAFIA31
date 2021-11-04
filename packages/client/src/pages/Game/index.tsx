import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ChatContainer from '../../containers/ChatContainer';
import GameLeftSideContainer from '../../containers/GameLeftSideContainer';
import useChat from '../../hooks/useChat';

const Game = () => {
  const ROOM_ID = 'hi';
  const { chatList, sendChat } = useChat(ROOM_ID);
  const [userList] = useState([{ userName: 'name1' }, { userName: 'name2' }]);

  return (
    <div css={GamePageStyle}>
      <GameLeftSideContainer userList={userList} roomId={ROOM_ID} />
      <ChatContainer chatList={chatList} sendChat={sendChat} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;
`;

export default Game;
