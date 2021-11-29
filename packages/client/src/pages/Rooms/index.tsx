import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '@src/templates/Header';
import RoomList from '@src/lists/RoomContainer';

const Rooms: FC = () => (
  <div css={roomsPageStyle}>
    <Header createRoom profilePage />
    <div css={roomsPageBodyStyle}>
      <RoomList />
    </div>
  </div>
);

const roomsPageStyle = css`
  height: 100vh;
`;

const roomsPageBodyStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px;
  height: calc(100vh - 100px);
`;

export default Rooms;
