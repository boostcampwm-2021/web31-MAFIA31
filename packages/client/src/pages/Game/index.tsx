import { useLocation, useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import LeftSideContainer from '@containers/LeftSideContainer';
import ChatContainer from '@containers/ChatContainer';
import RightSideContainer from '@containers/RightSideContainer';
import usePreventLeave from '@src/hooks/usePreventLeave';
import { User } from '@mafia/domain/types/user';
import useGame from '@src/hooks/useGame';
import Toast from '@components/Toast';

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
  const { myJob, isNight } = useGame();
  usePreventLeave();

  return (
    <div css={gamePageStyle(isNight)}>
      <Toast isNight={isNight} />
      <LeftSideContainer
        initPlayers={initPlayers}
        isNight={isNight}
        myJob={myJob}
        roomName={roomName}
      />
      <ChatContainer isNight={isNight} />
      <RightSideContainer myJob={myJob} isNight={isNight} initPlayers={initPlayers} />
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
