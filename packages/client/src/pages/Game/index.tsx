/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import VoteContainer from '../../containers/VoteContainer';
import ChatContainer from '../../containers/ChatContainer';
import useChat from '../../hooks/useChat';

const Game = () => {
  const { chatList, sendChat } = useChat('hi');

  return (
    <div css={gameContainerStyle}>
      <VoteContainer />
      <ChatContainer chatList={chatList} sendChat={sendChat} />
    </div>
  );
};

const gameContainerStyle = css`
  display: flex;

  height: 100%;
`;

export default Game;
