import React, { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, primaryDarkHover, white } from '@src/constants';
import useTab, { Tab } from '@src/hooks/useTab';
import { Achievement } from '@mafia/domain/types/achievement';
import dummmyAchievementList from '@src/pages/Profile/dummyData';
import JobStatList from '@src/lists/JobStatList';
import AchievementList from '@src/lists/AchievementListContainer';

interface PropType {
  data: any;
}

const TabContainer: FC<PropType> = ({ data }) => {
  const [achievementList] = useState<Achievement[]>(dummmyAchievementList);

  const allTabs: Tab[] = [
    { name: '통계', content: data ? <JobStatList jobStat={data.jobStat} /> : <></> },
    {
      name: '업적',
      content: data ? <AchievementList achievementList={achievementList} /> : <></>,
    },
  ];
  const { currentTab, changeTab } = useTab(0, allTabs);

  return (
    <div css={tabContainerStyle}>
      <div css={tabListStyle}>
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
  );
};

const tabListStyle = css`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  border-bottom: 6px solid ${primaryDark};
`;

const tabContainerStyle = css`
  display: flex;
  flex-direction: column;

  gap: 40px;
  width: 60%;

  @media (max-width: 1024px) {
    width: 90%;
  }
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

export default TabContainer;
