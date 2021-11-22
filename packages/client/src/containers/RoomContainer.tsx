import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { RoomCard } from '@src/components/Card';
import { RoomInfo } from '@src/types';

const RoomContainer = () => {
  const getRoomList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms`;
    const { data } = await axios.get(url);
    return data.roomList;
  };

  const { isLoading, data: roomList, error } = useQuery<RoomInfo[], Error>('rooms', getRoomList);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div css={roomContainerStyle}>
      {roomList!.map((roomInfo) => (
        <Link to={{ pathname: '/waiting', search: roomInfo.roomId }} key={roomInfo.roomId}>
          <RoomCard roomInfo={roomInfo} />
        </Link>
      ))}
    </div>
  );
};

const roomContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  overflow-y: scroll;
  -ms-overflow-style: none;

  padding: 30px 20px;
  height: 100%;
  gap: 30px 50px;

  ::-webkit-scrollbar {
    display: none;
  }

  a {
    height: min-content;
  }
`;

export default RoomContainer;
