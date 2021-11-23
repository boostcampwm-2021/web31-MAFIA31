/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Job, JobStat } from '@mafia/domain/types/game';
import JobStatCard from '@src/components/Card/JobStatCard';
import { useUserInfo } from '@src/contexts/userInfo';
import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Redirect } from 'react-router-dom';

const JobStatContainer: FC = () => {
  const { userInfo } = useUserInfo();
  if (!userInfo) {
    return <Redirect to="/" />;
  }

  const { userName } = userInfo;

  const url = `${process.env.REACT_APP_API_URL}/api/users/${userName}`;

  const getUserStatData = async () => {
    const {
      data: { jobStat },
    } = await axios.get(url);
    return jobStat;
  };

  const {
    isLoading,
    data: jobStat,
    error,
  } = useQuery<JobStat, Error>('userStats', getUserStatData);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div css={JobStatContainerStyle}>
      {Object.entries(jobStat!).map((el) => (
        <JobStatCard job={el[0] as Job} stat={el[1]} key={el[0]} />
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
