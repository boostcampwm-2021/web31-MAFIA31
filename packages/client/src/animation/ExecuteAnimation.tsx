import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const width = 100;
const height = 100;
const ExecuteAnimation: FC = () => (
  <div css={wrapperStyle}>
    <img css={ringStyle} src="assets/images/ring.png" alt="ring" />
    <img css={wingStyle(true)} src="assets/images/wing-left.png" alt="wing" />
    <img css={wingStyle(false)} src="assets/images/wing-right.png" alt="wing" />
    <img css={cloudStyle} src="assets/images/cloud.png" alt="cloud" />
    <img css={cloudStyle2} src="assets/images/cloud.png" alt="cloud" />
  </div>
);
const wrapperStyle = css`
  width: ${width}px;
  height: ${height}px;
  position: relative;
  background-image: url(‘/assets/images/citizen.png’);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const ringStyle = css`
  position: absolute;
  top: -10px;
  left: ${width / 2 - 20}px;
  width: 30px;
  height: 30px;
  animation: MoveUpDown 1s linear infinite;
  @keyframes MoveUpDown {
    0% {
      top: -10px;
    }
    100% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
  }
`;
const wingStyle = (isLeft: boolean) => css`
  position: absolute;
  top: 30px;
  left: ${isLeft ? -25 : width - 10}px;
  width: 30px;
  height: 30px;
  animation: WingUpDown 1s linear infinite;
  @keyframes WingUpDown {
    0% {
      top: 30px;
    }
    100% {
      top: 30px;
    }
    50% {
      top: 25px;
    }
  }
`;
const cloudStyle = css`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  animation: moveDown 2s linear infinite;
  @keyframes moveDown {
    100% {
      top: ${height - 30}px;
    }
    0% {
      top: -130px;
    }
  }
`;
const cloudStyle2 = css`
  position: absolute;
  top: -20px;
  left: ${width - 20}px;
  width: 50px;
  height: 50px;
  animation: moveDown2 2s linear infinite;
  @keyframes moveDown2 {
    100% {
      top: ${height}px;
    }
    0% {
      top: -100px;
    }
  }
`;
export default ExecuteAnimation;
