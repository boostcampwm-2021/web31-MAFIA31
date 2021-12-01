/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomInfo } from '@mafia/domain/types/room';
import useRoom from '@src/hooks/useRoom';
import useSocket from '@src/hooks/useSocket';
import WaitingList from '@src/lists/WaitingListContainer';
import { useHistory, useLocation } from 'react-router-dom';
import WaitingBottomBarContainer from './WaitingBottomBarContainer';

interface locationType {
  roomInfo: RoomInfo;
}

const WaitingListContainer = () => {
  const { search } = useLocation<locationType>();
  const history = useHistory();

  if (!search.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
    history.push({ pathname: '/rooms' });
  }

  useSocket(search.replace(/\?/g, ''));
  const { players, isHost, sendReady, sendStart, isAllReady } = useRoom();

  return (
    <div css={pageBodyStyle}>
      <WaitingList userList={players} />
      <WaitingBottomBarContainer
        isHost={isHost}
        sendReady={sendReady}
        sendStart={sendStart}
        isAllReady={isAllReady}
      />
    </div>
  );
};

const pageBodyStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  gap: 40px;
  height: calc(100vh - 100px);
`;

export default WaitingListContainer;
