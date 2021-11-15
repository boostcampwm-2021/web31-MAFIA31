/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useTimer from '@src/hooks/useTimer';
import useExecute from '@hooks/useExecute';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@src/hooks/useAbility';
import { primaryDark, primaryLight, titleActive, white } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';
import { useEffect } from 'react';
import useGame from '@src/hooks/useGame';

const Game = () => {
  const myUserName = 'user1';

  const playerStateList = useExecute();
  const { chatList, sendChat, sendNightChat } = useChat();
  const { playerList, voteUser } = useVote(myUserName);
  const { timer, isNight } = useTimer();
  const { emitAbility, mafiaPickList } = useAbility('user1', 'mafia');
  const { myJob } = useGame();

  useEffect(() => {
    console.log('night', isNight);
  }, [isNight]);

  return (
    <div css={gamePageStyle(isNight)}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={playerList}
        myUserName={myUserName}
        timer={timer}
        voteUser={voteUser}
        emitAbility={emitAbility}
        mafiaPickList={mafiaPickList}
        isNight={isNight}
      />
      <ChatContainer
        chatList={chatList}
        sendChat={sendChat}
        sendNightChat={sendNightChat}
        isNight={isNight}
      />
      <RightSideContainer playerStateList={playerStateList} myJob={myJob} isNight={isNight} />
    </div>
  );
};

const gamePageStyle = (isNight: boolean) => css`
  display: flex;

  height: 100vh;
  color: ${isNight ? white : titleActive};
  background-color: ${isNight ? primaryDark : primaryLight};
`;

export default Game;
