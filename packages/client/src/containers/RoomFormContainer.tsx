/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomInfo } from '@mafia/domain/types/room';
import apiClient from '@src/axios/apiClient';
import { primaryDark, primaryDarkHover, white } from '@src/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RoomFormContainer = () => {
  const [roomName, setRoomName] = useState<string>('');

  const roomId = uuidv4();
  const newRoom: RoomInfo = {
    roomId,
    title: roomName,
    status: 'ready',
  };

  const handleOnClick = () => {
    apiClient.post('/rooms', { newRoom });
  };

  return (
    <div css={RoomFormStyle}>
      <div className="room-name-label">방 이름</div>
      <div className="input-button">
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Link to={{ pathname: '/waiting', search: roomId }}>
          <button type="button" onClick={handleOnClick}>
            방 만들기
          </button>
        </Link>
      </div>
    </div>
  );
};

const RoomFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .room-name-label {
    color: ${primaryDark};
    font-size: 20px;
    font-weight: bold;
  }
  .input-button {
    display: flex;
    gap: 10px;
  }
  input {
    border: none;
    border-bottom: 1px solid ${primaryDark};
    &:focus {
      outline: none;
    }
    font-size: 16px;
  }
  button {
    background-color: ${primaryDark};
    color: ${white};
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: ${primaryDarkHover};
    }
    height: 30px;
  }
`;

export default RoomFormContainer;
