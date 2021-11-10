/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomCard } from '@src/components/Card';
import { RoomInfo } from '@src/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomContainer = () => {
  const [roomList, setRoomList] = useState<RoomInfo[]>([]);

  const updateRoomList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/room`;

    const response = await fetch(url);
    const data = await response.json();

    setRoomList(data.roomList);
  };

  useEffect(() => {
    updateRoomList();
  }, [roomList]);

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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px 30px;
`;

export default RoomContainer;
