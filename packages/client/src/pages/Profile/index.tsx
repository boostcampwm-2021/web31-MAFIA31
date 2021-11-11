import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image, ImageSizeList } from '@src/components/Image';
import Header from '@src/templates/Header';
import { grey4, primaryDark, primaryLight, titleActive, white } from '@src/constants';
import { Achievement } from '@mafia/domain/types/achievement';
import { AchievementCard } from '@src/components/Card';
import dummmyAchievementList from './dummyData';

const ACHIEVEMENT_PERCENTAGE_LABEL = '업적 달성률';
const TOTAL_PERCENTAGE = 100;
const PERCENTAGE_MULTIPLE = 2.8;
const TITLE = '업적';
const TROPHY_IMG_SRC = 'assets/images/trophy.png';

const Profile: FC = () => {
  const nickname = '닉네임';
  const profileImgSrc = 'assets/images/mafia.png';
  const achievementPercentage = 45;
  const [achievementList] = useState<Achievement[]>(dummmyAchievementList);

  return (
    <>
      <Header />
      <div css={pageStyle}>
        <div css={leftSideStyle}>
          <div css={profileStyle}>
            <Image size={ImageSizeList.LARGE} src={profileImgSrc} />
            <div>{nickname}</div>
          </div>
          <div css={achievementPercentStyle}>
            <div css={achiementLabelStyle}>
              <span>{ACHIEVEMENT_PERCENTAGE_LABEL}</span>
              <span>{achievementPercentage}%</span>
            </div>
            <div css={totalPercentageDivStyle}>
              <div css={myPercentageDivStyle(achievementPercentage)} />
            </div>
          </div>
        </div>
        <div css={rightSideStyle}>
          <div css={titleStyle}>
            <img src={TROPHY_IMG_SRC} alt="profile" />
            <h1 css={titleTextStyle}>{TITLE}</h1>
          </div>

          <div css={achievementListStyle}>
            {achievementList.map((e) => (
              <AchievementCard
                key={e.title}
                title={e.title}
                imgSrc={e.imgSrc}
                isAccomplished={e.isAccomplished}
                description={e.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const pageStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 80px;
  padding: 120px;
  @media (max-width: 1220px) {
    flex-direction: column;
  }
`;

const leftSideStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

const rightSideStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const profileStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
`;

const achiementLabelStyle = css`
  display: flex;
  gap: 8px;
`;

const achievementPercentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
`;

const totalPercentageDivStyle = css`
  position: relative;
  width: ${TOTAL_PERCENTAGE * PERCENTAGE_MULTIPLE}px;
  height: 22px;
  background-color: ${grey4};
  border-radius: 30px;
`;

const myPercentageDivStyle = (achievementPercentage: number) => css`
  position: absolute;
  width: ${achievementPercentage * PERCENTAGE_MULTIPLE}px;
  height: 100%;
  background-color: ${primaryDark};
  border-radius: 30px 0px 0px 30px;
  z-index: 1;

  animation-name: movingRow;
  animation-duration: 0.5s;

  @keyframes movingRow {
    0% {
      width: 0px;
    }
    100% {
      width: ${achievementPercentage * PERCENTAGE_MULTIPLE}px;
    }
  }
`;

const titleStyle = css`
  display: flex;
  gap: 8px;
`;

const titleTextStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 72px;

  text-shadow: ${white} -3px -3px, ${white} 3px -3px, ${white} -3px 3px, ${white} 3px 3px,
    ${titleActive} 4px 4px 5px;
`;

const achievementListStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  align-items: center;
  justify-items: center;
  gap: 35px;

  min-width: 680px;
  max-height: 612px;

  overflow-y: scroll;

  padding: 40px;

  background-color: ${primaryLight};
  border-radius: 20px;
`;

export default Profile;
