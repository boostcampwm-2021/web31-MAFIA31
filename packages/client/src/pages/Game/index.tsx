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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePreventLeave from '@src/hooks/usePreventLeave';

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
  usePreventLeave();

  useEffect(() => {
    if (!isNight && timer.substr(3, 2) === '30') {
      toast('🗳 지금부터 투표시간입니다.');
    }
    if (!isNight && timer.substr(3, 2) === '10') {
      toast('투표시간이 10초 남았습니다!', { autoClose: 10000, hideProgressBar: false });
    }
  }, [timer]);

  useEffect(() => {
    if (isNight) {
      toast(`🌒 밤이 되었습니다... 개인 능력을 사용해주세요.`, { theme: 'dark' });
    } else {
      toast(`☀️ 낮이 되었습니다... 투표로 희생 될 사람을 결정해주세요.`, { theme: 'light' });
    }
  }, [isNight]);

  return (
    <div css={gamePageStyle(isNight)}>
      <ToastContainer position="top-center" autoClose={7000} hideProgressBar />
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
