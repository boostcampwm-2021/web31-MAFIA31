import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import RoomContainer from '@src/containers/RoomContainer';
import Header from '@src/templates/Header';

const Rooms: FC = () => (
  <div>
    <Header />
    <div css={roomPageStyle}>
      <div css={padding}>
        <RoomContainer />
      </div>
    </div>
  </div>
);

const roomPageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const padding = css``;

export default Rooms;
