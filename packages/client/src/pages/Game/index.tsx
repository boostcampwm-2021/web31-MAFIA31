/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import useSocket from '@hooks/useSocket';
import useExecute from '@hooks/useExecute';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import { primaryDark } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';

const Game = () => {
  const { socketRef } = useSocket('123e4567-e89b-12d3-a456-426614174000');
  const playerStateList = useExecute(socketRef);
  const { chatList, sendChat } = useChat(socketRef);
  const { playerList, voteUser } = useVote(socketRef, 'user1');

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={playerList}
        voteUser={voteUser}
      />
      <ChatContainer chatList={chatList} sendChat={sendChat} />
      <RightSideContainer playerStateList={playerStateList} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;

  height: 100vh;
  background-color: ${primaryDark};
`;

export default Game;
