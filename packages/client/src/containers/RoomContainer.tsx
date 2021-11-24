import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import apiClient from '@src/axios/apiClient';
import { RoomInfo } from '@src/types';
import useModal from '@hooks/useModal';
import { RoomCard } from '@components/Card';
import NoticeModal from '@components/Modal/NoticeModal';

const RoomContainer = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const getRoomList = async () => {
    const { data } = await apiClient.get('/rooms');
    return data.roomList;
  };

  const enterRoomHandler = async (event: React.MouseEvent, roomStatus: string) => {
    if (roomStatus === 'ready') return;
    event.preventDefault();
    openModal();
  };

  const { isLoading, data: roomList, error } = useQuery<RoomInfo[], Error>('rooms', getRoomList);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div css={roomContainerStyle}>
      <NoticeModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <p>이미 게임이 시작한 방입니다.</p>
      </NoticeModal>
      {roomList!.map((roomInfo) => (
        <Link
          to={{ pathname: '/waiting', search: roomInfo.roomId }}
          key={roomInfo.roomId}
          onClick={(event) => enterRoomHandler(event, roomInfo.status)}
        >
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
