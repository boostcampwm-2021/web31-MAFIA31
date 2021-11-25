/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Job, Stat } from '@mafia/domain/types/game';
import { primaryDark, white } from '@src/constants';
import { FC } from 'react';
import { Image, ImageSizeList } from '../Image';

interface Props {
  job: Job;
  stat: Stat;
}

const koreanJobName = {
  mafia: '마피아',
  citizen: '시민',
  police: '경찰',
  doctor: '의사',
};

const JobStatCard: FC<Props> = ({ job, stat }) => {
  const imgSrc = `/assets/images/${job}.png`;

  return (
    <div css={JobStatCardStyle}>
      <div css={characterContainerStyle}>
        <Image size={ImageSizeList.SMALL} src={imgSrc} />
        <span>{koreanJobName[job]}</span>
      </div>
      <div css={numberContainer}>
        <div className="number">
          <span>플레이 수</span>
          <span>{`${stat.cnt} 회`}</span>
        </div>
        <div className="number">
          <span>승률</span>
          <span>{`${stat.cnt === 0 ? 0 : Math.round((stat.winCnt / stat.cnt) * 100)} %`}</span>
        </div>
      </div>
    </div>
  );
};

const JobStatCardStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 330px;
  height: 160px;
  padding: 16px;
  border-radius: 20px;
  background-color: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
`;

const characterContainerStyle = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  span {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
  }
`;

const numberContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 4px;

  .number {
    display: flex;
    justify-content: space-between;
    width: 120px;

    & :last-child {
      font-weight: bold;
      color: ${primaryDark};
    }
  }
`;

export default JobStatCard;
