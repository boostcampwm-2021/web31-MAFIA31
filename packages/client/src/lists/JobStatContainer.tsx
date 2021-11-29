/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Job, JobStat } from '@mafia/domain/types/game';
import JobStatCard from '@src/components/Card/JobStatCard';
import { useUserInfo } from '@src/contexts/userInfo';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  jobStat: JobStat;
}

const JobStatList: FC<Props> = ({ jobStat }) => {
  const { userInfo } = useUserInfo();
  if (!userInfo) {
    return <Redirect to="/" />;
  }

  return (
    <div css={JobStatListStyle}>
      {Object.entries(jobStat!).map((el) => (
        <JobStatCard job={el[0] as Job} stat={el[1]} key={el[0]} />
      ))}
    </div>
  );
};

const JobStatListStyle = css`
  display: flex;
  overflow-x: scroll;

  gap: 24px;
  width: 100%;
  padding: 16px;
`;

export default JobStatList;
