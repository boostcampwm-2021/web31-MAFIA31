/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Achievement } from '@mafia/domain/types/achievement';
import { AchievementCard } from '@src/components/Card';
import { primaryLight } from '@src/constants';
import { FC } from 'react';

interface Props {
  achievementList: Achievement[];
}
const AchievementListContainer: FC<Props> = ({ achievementList }) => (
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
);

const achievementListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
  -ms-overflow-style: none;

  gap: 35px;
  padding: 40px 27px;
  max-width: 820px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${primaryLight};

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default AchievementListContainer;
