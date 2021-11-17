import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import { PlayerInfo, Memo } from '@src/types';
import { useUserInfo } from '@contexts/userInfo';
import useGame from '@hooks/useGame';
import useTimer from '@hooks/useTimer';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@hooks/useAbility';
import usePreventLeave from '@hooks/usePreventLeave';
import LeftSideContainer from '@containers/LeftSideContainer';
import ChatContainer from '@containers/ChatContainer';
import RightSideContainer from '@containers/RightSideContainer';

import 'react-toastify/dist/ReactToastify.css';

interface locationType {
  userList: PlayerInfo[];
}

const Game = () => {
  const { state } = useLocation<locationType>();
  const { userInfo } = useUserInfo();
  const history = useHistory();

  if (!state?.userList || !userInfo?.userName) {
    history.push('/');
    return <></>;
  }

  const { userList } = state;
  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>([]);
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const { chatList, sendChat, sendNightChat } = useChat();
  const { voteList, voteUser, initVote } = useVote();
  const { timer, isNight } = useTimer();
  const { emitAbility, mafiaPickList } = useAbility('mafia', setPlayerStateList);
  const { myJob } = useGame();
  usePreventLeave();

  const initPlayerState = (userList: User[]) => {
    setPlayerStateList(userList.map(({ userName }) => ({ userName, isDead: false })));
  };

  const initMemo = (userList: User[]) => {
    setMemoList(userList.map(({ userName }) => ({ userName, guessJob: 'question' })));
  };

  const init = () => {
    initVote(userList);
    initMemo(userList);
    initPlayerState(userList);
  };

  useEffect(() => {
    init();
  }, []);

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
      <RightSideContainer
        playerStateList={playerStateList}
        memoList={memoList}
        myJob={myJob}
        isNight={isNight}
      />
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
