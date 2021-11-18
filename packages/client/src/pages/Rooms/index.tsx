import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import RoomContainer from '@src/containers/RoomContainer';
import Header from '@src/templates/Header';

const Rooms: FC = () => (
  <div css={roomsPageStyle}>
    <Header createRoom profilePage />
    <div css={roomsPageBodyStyle}>
      <RoomContainer />
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
