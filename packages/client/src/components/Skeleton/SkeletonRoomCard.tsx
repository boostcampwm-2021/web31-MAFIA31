/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { grey2, white } from '@src/constants';
import SkeletonKeyframeAnimation from './SkeletonKeyframeAnimation';

const SkeletonRoomCard = () => (
  <div css={roomCardStyle}>
    <div css={leftSide}>
      <div className="room-title" css={SkeletonKeyframeAnimation} />
      <div className="room-info" css={SkeletonKeyframeAnimation} />
    </div>
    <div css={[rightSide, SkeletonKeyframeAnimation]} />
  </div>
);

const roomCardStyle = css`
  position: relative;

  padding: 24px;
  width: 450px;
  height: 180px;

  background-color: ${white};
  border-radius: 20px;
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
`;

const leftSide = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 302px;
  height: 100%;

  .room-title,
  .room-info {
    width: 270px;
    height: 20px;
    border-radius: 20px;
    background-color: ${grey2};
  }

  .room-info {
    width: 180px;
  }
`;

const rightSide = css`
  position: absolute;
  top: 0;
  right: 0;

  width: 100px;
  height: 180px;
  border-radius: 0 20px 20px 0;
  background-color: ${grey2};
`;

export default SkeletonRoomCard;
