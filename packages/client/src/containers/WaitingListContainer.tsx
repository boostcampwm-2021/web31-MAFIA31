/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomInfo } from '@mafia/domain/types/room';
import apiClient from '@src/axios/apiClient';
import useRoom from '@src/hooks/useRoom';
import useSocket from '@src/hooks/useSocket';
import WaitingList from '@src/lists/WaitingList';
import { useLayoutEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import WaitingTopBarContainer from './WaitingTopBarContainer';

interface locationType {
  roomInfo: RoomInfo;
}

const WaitingListContainer = () => {
  const { search } = useLocation<locationType>();
  const history = useHistory();
  const [roomName, setRoomName] = useState('');
  const roomId = search.replace(/\?/g, '');

  const getRoomInfo = async () => {
    const { data } = await apiClient.get(`/rooms/${roomId}`);
    setRoomName(data.title);
  };

  useLayoutEffect(() => {
    getRoomInfo();
  }, []);

  if (!search.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
    history.push({ pathname: '/rooms' });
  }

  useSocket(search.replace(/\?/g, ''));
  const { players, isHost, sendReady, sendStart, isAllReady } = useRoom(roomName);

  return (
    <div css={pageBodyStyle}>
      <WaitingTopBarContainer
        isHost={isHost}
        sendReady={sendReady}
        sendStart={sendStart}
        isAllReady={isAllReady}
        roomName={roomName}
      />
      <WaitingList userList={players} />
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
