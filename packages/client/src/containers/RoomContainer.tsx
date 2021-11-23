import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { RoomCard } from '@src/components/Card';
import { RoomInfo } from '@src/types';

Modal.setAppElement('#root');

const RoomContainer = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const getRoomList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/rooms`;
    const { data } = await axios.get(url);
    return data.roomList;
  };

  const enterRoomHandler = async (event: React.MouseEvent, roomStatus: string) => {
    if (roomStatus === 'ready') return;
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data: roomList, error } = useQuery<RoomInfo[], Error>('rooms', getRoomList);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div css={roomContainerStyle}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Alert Modal"
      >
        <span>이미 게임이 시작한 방입니다.</span>
      </Modal>
      {roomList!.map((roomInfo) => (
        <Link to={{ pathname: '/waiting', search: roomInfo.roomId }} key={roomInfo.roomId} onClick={(event) => enterRoomHandler(event, roomInfo.status)}>
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

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '3% 5%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default RoomContainer;
