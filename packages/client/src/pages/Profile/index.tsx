import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image, ImageSizeList } from '@src/components/Image';
import Header from '@src/templates/Header';
import { grey4, primaryDark, primaryDarkHover, white } from '@src/constants';
import { Achievement } from '@mafia/domain/types/achievement';
import { useUserInfo } from '@contexts/userInfo';
import { Redirect } from 'react-router-dom';
import JobStatContainer from '@src/containers/JobStatContainer';
import { useQuery } from 'react-query';
import { Stat } from '@mafia/domain/types/game';
import apiClient from '@src/axios/apiClient';
import useTab, { Tab } from '@src/hooks/useTab';
import AchievementListContainer from '@src/containers/AchievementListContainer';
import dummmyAchievementList from './dummyData';

const ACHIEVEMENT_PERCENTAGE_LABEL = '업적 달성률';
const TOTAL_PERCENTAGE = 100;
const PERCENTAGE_MULTIPLE = 2.8;

const Profile: FC = () => {
  const { userInfo } = useUserInfo();
  if (!userInfo) {
    return <Redirect to="/" />;
  }

  const { userName, profileImg } = userInfo;

  const getUserStatData = async () => {
    const { data } = await apiClient.get(`/users/${userName}`);
    return data;
  };
  const { isLoading, data, error } = useQuery<any, Error>('user', getUserStatData);
  const achievementPercent = 45;
  const [achievementList] = useState<Achievement[]>(dummmyAchievementList);

  const allTabs: Tab[] = [
    { name: '통계', content: data ? <JobStatContainer jobStat={data.jobStat} /> : <></> },
    {
      name: '업적',
      content: data ? <AchievementListContainer achievementList={achievementList} /> : <></>,
    },
  ];
  const { currentTab, changeTab } = useTab(0, allTabs);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  const { playCnt } = data;
  const winCnt: number = (Object.values(data.jobStat) as Stat[]).reduce(
    (prev, curr) => prev + curr.winCnt,
    0,
  );
  const winRate: number = Math.round((winCnt / playCnt) * 100);

  return (
    <div css={profilePageStyle}>
      <Header exit />
      <div css={profilePageBodyStyle}>
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

        <div css={rightSideStyle}>
          <div css={tabContainerStyle}>
            {allTabs.map((tab, idx) => (
              <button
                css={tabButtonStyle}
                key={tab.name}
                type="button"
                onClick={() => changeTab(idx)}
                style={{
                  backgroundColor: currentTab.name === tab.name ? primaryDarkHover : primaryDark,
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {currentTab.content}
        </div>
      </div>
    </div>
  );
};

const tabContainerStyle = css`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  border-bottom: 6px solid ${primaryDark};
`;

const tabButtonStyle = css`
  width: 100px;
  height: 50px;
  background-color: ${primaryDark};
  color: ${white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${primaryDarkHover};
  }
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
`;

const profilePageStyle = css`
  height: 100vh;

  @media (max-width: 1024px) {
    height: auto;
  }
`;

const profilePageBodyStyle = css`
  display: flex;
  justify-content: space-evenly;

  padding: 80px 40px;
  height: calc(100vh - 100px);
  gap: 80px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    height: auto;
  }
`;

const leftSideStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 50px;
`;

const rightSideStyle = css`
  display: flex;
  flex-direction: column;

  gap: 40px;
  width: 60%;

  @media (max-width: 1024px) {
    width: 90%;
  }
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

export default Profile;
