/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomCard } from '@src/components/Card';
import { RoomInfo } from '@src/types';
import disconnectSocket from '@src/utils/disconnectSocket';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomContainer = () => {
  disconnectSocket();

  const [roomList, setRoomList] = useState<RoomInfo[]>([]);

  const updateRoomList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms`;

    const response = await fetch(url);
    const data = await response.json();

    setRoomList(data.roomList);
  };

  useEffect(() => {
    updateRoomList();
  }, []);

  return (
    <div css={roomContainerStyle}>
      {roomList.map((roomInfo) => (
        <Link to={{ pathname: '/waiting', state: { roomInfo } }} key={roomInfo.roomId}>
          <RoomCard roomInfo={roomInfo} />
        </Link>
      ))}
    </div>
  );
};

const roomContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  overflow-y: scroll;
  -ms-overflow-style: none;

  padding: 40px;
  height: 100%;
  gap: 30px 30px;

  ::-webkit-scrollbar {
    display: none;
  }

  a {
    height: min-content;
  }
`;

export default RoomContainer;
