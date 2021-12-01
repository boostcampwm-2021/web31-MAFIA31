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

interface locationType {
  players: User[];
  roomName: string;
}

const Game = () => {
  const { state } = useLocation<locationType>();
  const history = useHistory();

  if (!state.players) {
    history.push('/');
    return <></>;
  }

  const { players: initPlayers, roomName } = state;
  const { players, myJob, mafias, isNight, voteSec } = useGame(initPlayers);
  const { selected, emitAbility, getSelectedImg } = useAbility(isNight, voteSec, myJob);
  useToast(isNight, voteSec);
  usePreventLeave();

  return (
    <div css={gamePageStyle(isNight)}>
      <ToastContainer position="top-center" autoClose={7000} hideProgressBar />
      <LeftSideContainer
        players={players}
        mafias={mafias}
        selected={selected}
        isNight={isNight}
        getSelectedImg={getSelectedImg}
        emitAbility={emitAbility}
        roomName={roomName}
      />
      <ChatContainer isNight={isNight} />
      <RightSideContainer
        players={players}
        myJob={myJob}
        isNight={isNight}
        initPlayers={initPlayers}
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
