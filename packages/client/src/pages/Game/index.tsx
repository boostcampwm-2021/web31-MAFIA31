/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import useTimer from '@src/hooks/useTimer';
import useSocket from '@hooks/useSocket';
import useExecute from '@hooks/useExecute';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import { primaryDark } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';
import useGame from '@src/hooks/useGame';

const Game = () => {
  const { socketRef } = useSocket('123e4567-e89b-12d3-a456-426614174000');
  const playerStateList = useExecute(socketRef);
  const { chatList, sendChat, sendNightChat } = useChat(socketRef);
  const { playerList, voteUser } = useVote(socketRef, 'user1');
  const { myJob } = useGame(socketRef);
  const { isNight } = useTimer(socketRef);

  useEffect(() => {
    console.log('night', isNight);
  }, [isNight]);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={playerList}
        voteUser={voteUser}
      />
      <ChatContainer
        chatList={chatList}
        sendChat={sendChat}
        sendNightChat={sendNightChat}
        isNight={isNight}
      />
      <RightSideContainer playerStateList={playerStateList} myJob={myJob} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;

  height: 100vh;
  background-color: ${primaryDark};
`;

export default Game;
