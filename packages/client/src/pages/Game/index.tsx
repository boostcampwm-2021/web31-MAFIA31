/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useTimer from '@src/hooks/useTimer';
// import useExecute from '@hooks/useExecute';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@src/hooks/useAbility';
import { primaryDark, primaryLight, titleActive, white } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';
import { useEffect, useState } from 'react';
import useGame from '@src/hooks/useGame';
import { PlayerState } from '@mafia/domain/types/game';

const Game = () => {
  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>([
    { userName: 'user1', isDead: true },
    { userName: 'user2', isDead: false },
    { userName: 'user3', isDead: true },
    { userName: 'user4', isDead: false },
  ]);
  // const playerStateList = useExecute();
  const { chatList, sendChat, sendNightChat } = useChat();
  const { voteList, voteUser } = useVote();
  const { timer, isNight } = useTimer();
  const { emitAbility, mafiaPickList } = useAbility('mafia', setPlayerStateList);
  const { myJob } = useGame();

  useEffect(() => {
    console.log('night', isNight);
  }, [isNight]);

  return (
    <div css={gamePageStyle(isNight)}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={voteList}
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
