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

const JobStatContainer: FC<Props> = ({ jobStat }) => {
  const { userInfo } = useUserInfo();
  if (!userInfo) {
    return <Redirect to="/" />;
  }

  return (
    <div css={JobStatContainerStyle}>
      {Object.entries(jobStat!).map(([job, stat]) => (
        <JobStatCard key={job} job={job as Job} stat={stat} />
      ))}
    </div>
  );
};

const JobStatContainerStyle = css`
  display: flex;
  overflow-x: scroll;

  gap: 24px;
  width: 100%;
  padding: 16px;
`;

export default JobStatContainer;
