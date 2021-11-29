import { ToastContainer } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import LeftSideContainer from '@containers/LeftSideContainer';
import ChatContainer from '@containers/ChatContainer';
import RightSideContainer from '@containers/RightSideContainer';
import usePreventLeave from '@src/hooks/usePreventLeave';
import { User } from '@mafia/domain/types/user';
import useGame from '@src/hooks/useGame';
import useAbility from '@hooks/useAbility';
import useToast from '@src/hooks/useToast';
import useLog from '@src/hooks/useLog';
import useMemo from '@hooks/useMemo';

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
  useToast(isNight, voteSec);
  usePreventLeave();

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
