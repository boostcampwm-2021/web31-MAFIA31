import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as TIME from '@mafia/domain/constants/time';
import { PlayerState } from '@mafia/domain/types/game';
import { User } from '@mafia/domain/types/user';
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import * as TOAST from '@src/constants/toast';
import { PlayerInfo, Memo } from '@src/types';
import { useUserInfo } from '@contexts/userInfo';
import useGame from '@hooks/useGame';
import useTimer from '@hooks/useTimer';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@hooks/useAbility';
import LeftSideContainer from '@containers/LeftSideContainer';
import ChatContainer from '@containers/ChatContainer';
import RightSideContainer from '@containers/RightSideContainer';
import usePreventLeave from '@src/hooks/usePreventLeave';
import usePlayerState from '@src/hooks/usePlayerState';

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

  const initPlayerState: PlayerState[] = userList.map(({ userName }) => ({
    userName,
    isDead: false,
  }));

  const { playerStateList } = usePlayerState(initPlayerState);
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const { chatList, sendChat, sendNightChat } = useChat();
  const { voteList, voteUser, initVote } = useVote();
  const { timer, isNight, voteSec } = useTimer();
  const { myJob } = useGame();
  const { emitAbility, victim } = useAbility(myJob);
  usePreventLeave();

  const initMemo = (userList: User[]) => {
    setMemoList(userList.map(({ userName }) => ({ userName, guessJob: 'question' })));
  };

  const init = () => {
    initVote(userList);
    initMemo(userList);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (voteSec === undefined) return;
    if (voteSec === TIME.VOTE) {
      toast(TOAST.VOTE_START);
    } else if (voteSec === TIME.VOTE_ALARM) {
      toast(TOAST.VOTE_ALARM, {
        autoClose: TIME.VOTE_ALARM * 1000,
        hideProgressBar: false,
      });
    } else if (voteSec === 0) {
      toast(TOAST.VOTE_END);
    }
  }, [voteSec]);

  useEffect(() => {
    if (isNight) {
      toast(TOAST.NIGHT, { theme: 'dark' });
    } else {
      toast(TOAST.DAY, { theme: 'light' });
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
        victim={victim}
        isNight={isNight}
        myJob={myJob}
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
