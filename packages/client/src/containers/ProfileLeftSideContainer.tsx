import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image, ImageSizeList } from '@src/components/Image';
import { Stat } from '@mafia/domain/types/game';
import { grey4, primaryDark } from '@src/constants';
import { User } from '@mafia/domain/types/user';

const ACHIEVEMENT_PERCENTAGE_LABEL = '업적 달성률';
const TOTAL_PERCENTAGE = 100;
const PERCENTAGE_MULTIPLE = 2.8;

interface PropType {
  data: any;
  userInfo: User;
}

const ProfileLeftSideContainer: FC<PropType> = ({ data, userInfo }) => {
  const { userName, profileImg } = userInfo;
  const achievementPercent = 45;
  const { playCnt } = data;
  const winCnt: number = (Object.values(data.jobStat) as Stat[]).reduce(
    (prev, curr) => prev + curr.winCnt,
    0,
  );
  const winRate: number = playCnt === 0 ? 0 : Math.round((winCnt / playCnt) * 100);
  return (
    <div css={leftSideStyle}>
      <div css={profileStyle}>
        <Image size={ImageSizeList.LARGE} src={profileImg} />
        <span>{userName}</span>
      </div>
      <div css={achievementStyle}>
        <div css={achievementLabelStyle}>
          <span>승률</span>
          <span>{winRate}%</span>
        </div>
        <div css={achievementPercentStyle}>
          <div css={percentStyle(winRate)} />
        </div>
      </div>
      <div css={achievementStyle}>
        <div css={achievementLabelStyle}>
          <span>{ACHIEVEMENT_PERCENTAGE_LABEL}</span>
          <span>{achievementPercent}%</span>
        </div>
        <div css={achievementPercentStyle}>
          <div css={percentStyle(achievementPercent)} />
        </div>
      </div>
    </div>
  );
};

const leftSideStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 50px;
`;

const profileStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;

  font-size: 24px;
  gap: 16px;
`;

const achievementStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;
  font-size: 20px;
  font-weight: 500;
`;

const achievementLabelStyle = css`
  span + span {
    margin-left: 8px;
  }
`;

const achievementPercentStyle = css`
  width: ${TOTAL_PERCENTAGE * PERCENTAGE_MULTIPLE}px;
  height: 22px;
  border-radius: 30px;
  background-color: ${grey4};
  filter: drop-shadow(0px 4px 4px rgba(78, 65, 109, 0.25));
`;

const percentStyle = (achievementPercentage: number) => css`
  width: ${achievementPercentage * PERCENTAGE_MULTIPLE}px;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  background-color: ${primaryDark};

  animation: movingRow 0.5s ease-in;
  @keyframes movingRow {
    0% {
      width: 0px;
    }
    100% {
      width: ${achievementPercentage * PERCENTAGE_MULTIPLE}px;
    }
  }
`;

export default ProfileLeftSideContainer;
