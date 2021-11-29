import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as TIME from '@mafia/domain/constants/time';
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import * as TOAST from '@src/constants/toast';
import useMemo from '@hooks/useMemo';
import useAbility from '@hooks/useAbility';
import LeftSideContainer from '@containers/LeftSideContainer';
import ChatContainer from '@containers/ChatContainer';
import RightSideContainer from '@containers/RightSideContainer';
import usePreventLeave from '@src/hooks/usePreventLeave';
import { User } from '@mafia/domain/types/user';
import useGame from '@src/hooks/useGame';
import useLog from '@src/hooks/useLog';

interface locationType {
  players: User[];
}

const Game = () => {
  const { state } = useLocation<locationType>();
  const history = useHistory();

  if (!state.players) {
    history.push('/');
    return <></>;
  }

  const { players: initPlayers } = state;
  const { players, myJob, mafias, isNight, timer, voteSec } = useGame(initPlayers);
  const { selected, emitAbility, getSelectedImg } = useAbility(isNight, voteSec, myJob);
  const { memos, updateMemo } = useMemo(initPlayers);
  const { logs, sendChat } = useLog();
  usePreventLeave();

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
    viewToast(voteSec.current);
  }, [voteSec.current]);

  return (
    <div css={gamePageStyle(isNight)}>
      <ToastContainer position="top-center" autoClose={7000} hideProgressBar />
      <LeftSideContainer
        players={players}
        mafias={mafias}
        selected={selected}
        timer={timer}
        isNight={isNight}
        getSelectedImg={getSelectedImg}
        emitAbility={emitAbility}
      />
      <ChatContainer chatList={logs} sendChat={sendChat} isNight={isNight} />
      <RightSideContainer
        players={players}
        memoList={memos}
        myJob={myJob}
        isNight={isNight}
        updateMemo={updateMemo}
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
