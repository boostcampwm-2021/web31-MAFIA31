import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white } from '../../constants/colors';

interface PropType {
  userName: string;
  job: string;
  isWinner: boolean;
}
const ResultCard: FC<PropType> = ({ userName, job, isWinner }) => {
  const WINNER_STAMP_SRC = '/assets/icons/stamp-winner.png';
  return (
    <div css={ResultCardStyle}>
      <img css={WinnerStampStyle(isWinner)} src={WINNER_STAMP_SRC} alt="winner stamp" />
      <div>{job}</div>
      <div>{userName}</div>
    </div>
  );
};

const ResultCardStyle = css`
  position: relative;
  width: 190px;
  height: 243px;

  background: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

const WinnerStampStyle = (isWinner: boolean) => css`
  display: ${isWinner ? 'block' : 'none'};

  animation-name: pulse;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.5;
      transform-origin: 50% 50%;
      transform: rotate(0.2turn) scale(5);
      transition: all 0.3s ease-out;
    }
    100% {
      opacity: 1;
      transform: rotate(-0.05turn) scale(1);
    }
  }
`;

export default ResultCard;
