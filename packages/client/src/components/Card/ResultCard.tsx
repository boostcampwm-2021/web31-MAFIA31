import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white } from '../../constants/colors';
import { ImageSizeList, Image } from '../Image';

interface PropType {
  userName: string;
  job: string;
  isWinner: boolean;
}

interface JobTable {
  [key: string]: { imgSrc: string; koreanName: string };
}

const jobTable: JobTable = {
  mafia: {
    imgSrc: 'assets/images/mafia.png',
    koreanName: '마피아',
  },
  citizen: {
    imgSrc: 'assets/images/citizen.png',
    koreanName: '시민',
  },
};

const ResultCard: FC<PropType> = ({ userName, job, isWinner }) => {
  const WINNER_STAMP_SRC = '/assets/icons/stamp-winner.png';
  return (
    <div css={resultCardStyle}>
      <div css={margin}>{jobTable[job].koreanName}</div>
      <img css={winnerStampStyle(isWinner)} src={WINNER_STAMP_SRC} alt="winner stamp" />
      <Image size={ImageSizeList.SMALL} src={jobTable[job].imgSrc} />
      <div css={margin}>{userName}</div>
    </div>
  );
};

const resultCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 190px;
  height: 243px;

  background: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

const margin = css`
  margin: 20px 0px;
`;

const winnerStampStyle = (isWinner: boolean) => css`
  display: ${isWinner ? 'block' : 'none'};

  position: absolute;
  top: 30px;
  left: 135px;

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
