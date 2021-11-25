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
import CrossVoteModal from '@src/components/Modal/CrossVoteModal';
import useVoteModal from '@src/hooks/useVoteModal';

interface locationType {
  userList: PlayerInfo[];
}

const Game = () => {
  const { state } = useLocation<locationType>();
  const history = useHistory();

  if (!state?.userList) {
    history.push('/');
    return <></>;
  }

  const { userList } = state;

  const initPlayerState: PlayerState[] = userList.map(({ userName }) => ({
    userName,
    isDead: false,
    isMafia: false,
  }));

  const { playerStateList } = usePlayerState(initPlayerState);
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const { chatList, sendChat, sendNightChat } = useChat();
  const { voteList, voteUser, initVote } = useVote();
  const { timer, isNight, voteSec } = useTimer();
  const { myJob } = useGame();
  const { emitAbility, victim, survivor } = useAbility(myJob);
  const { isVoteModalOpen, closeVoteModal, maxVotePlayer, crossVote } = useVoteModal();
  usePreventLeave();

  const initMemo = (userList: User[]) => {
    setMemoList(userList.map(({ userName }) => ({ userName, guessJob: 'question' })));
  };

  const init = () => {
    initVote(userList);
    initMemo(userList);
  };

  const viewToast = (condition: any) => {
    const NIGHT = true;
    const DAY = false;

    const toastOp = ((): [string, any?] | undefined => {
      switch (condition) {
        case TIME.VOTE:
          return [TOAST.VOTE_START];
        case TIME.VOTE_END:
          return [TOAST.VOTE_END];
        case TIME.VOTE_ALARM:
          return [
            TOAST.VOTE_ALARM,
            {
              autoClose: TIME.VOTE_ALARM * TIME.SEC,
              hideProgressBar: false,
            },
          ];
        case NIGHT:
          return [TOAST.NIGHT, { theme: 'dark' }];
        case DAY:
          return [TOAST.DAY, { theme: 'light' }];
        default:
          return undefined;
      }
    })();

    if (toastOp === undefined) return;
    toast(...toastOp);
  };

  useEffect(() => {
    viewToast(isNight);
  }, [isNight]);

  useEffect(() => {
    viewToast(voteSec);
  }, [voteSec]);

  useEffect(() => {
    setTimeout(closeVoteModal, 5000);
  }, [isVoteModalOpen]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div css={gamePageStyle(isNight)}>
      <ToastContainer position="top-center" autoClose={7000} hideProgressBar />
      <CrossVoteModal
        isOpen={isVoteModalOpen}
        onRequestClose={closeVoteModal}
        eventHandler={crossVote}
        closeModal={closeVoteModal}
      >
        <p>{maxVotePlayer}을(를) 투표로 처형할까요?</p>
      </CrossVoteModal>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={voteList}
        timer={timer}
        voteUser={voteUser}
        emitAbility={emitAbility}
        victim={victim}
        survivor={survivor}
        isNight={isNight}
        myJob={myJob}
      />
      <ChatContainer
        playerStateList={playerStateList}
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
