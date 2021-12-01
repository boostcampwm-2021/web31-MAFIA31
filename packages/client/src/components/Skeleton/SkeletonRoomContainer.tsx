/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SkeletonRoomCard from './SkeletonRoomCard';

const SkeletonRoomContainer = () => (
  <div css={roomListStyle}>
    {[1, 2, 3, 4].map((num) => (
      <SkeletonRoomCard key={num} />
    ))}
  </div>
);

const roomListStyle = css`
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

export default SkeletonRoomContainer;
