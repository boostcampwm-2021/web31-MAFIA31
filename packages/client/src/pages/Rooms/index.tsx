import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import RoomContainer from '@src/containers/RoomContainer';

const Rooms: FC = () => (
  <div css={roomPageStyle}>
    <div css={padding}>
      <RoomContainer />
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
