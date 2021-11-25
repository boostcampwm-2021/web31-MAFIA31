import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white } from '@constants/colors';
import { JOB_DICT } from '@src/constants';
import { JOB_ARR } from '@src/constants/job';
import { ImageSizeList, Image } from '../Image';

interface PropType {
  userName: string;
  job: string;
  win: boolean;
}

const ResultCard: FC<PropType> = ({ userName, job, win }) => {
  const WINNER_STAMP_SRC = '/assets/icons/stamp-winner.png';

  return (
    <div css={resultCardStyle}>
      <span className="job">{JOB_ARR.find((el) => el.job === job)?.jobKr}</span>
      {win ? <img css={winnerStampStyle} src={WINNER_STAMP_SRC} alt="winner stamp" /> : <></>}
      <Image size={ImageSizeList.SMALL} src={JOB_DICT[job].imageSrc} />
      <span>{userName}</span>
    </div>
  );
};

const resultCardStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 190px;
  height: 190px;
  border-radius: 20px;
  background-color: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);

  .job {
    font-weight: bold;
  }
`;

const winnerStampStyle = css`
  position: absolute;
  animation: pulse 1s forwards;
  top: 10px;
  right: -20px;

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
