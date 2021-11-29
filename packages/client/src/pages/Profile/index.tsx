import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '@src/templates/Header';

import { useUserInfo } from '@contexts/userInfo';
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiClient from '@src/axios/apiClient';
import TabContainer from '@src/containers/TabContainer';
import ProfileLeftSideContainer from '@src/containers/ProfileLeftSideContainer';

const Profile: FC = () => {
  const { userInfo } = useUserInfo();
  if (!userInfo) {
    return <Redirect to="/" />;
  }

  const { userName } = userInfo;

  const getUserStatData = async () => {
    const { data } = await apiClient.get(`/users/${userName}`);
    return data;
  };
  const { isLoading, data, error } = useQuery<any, Error>('user', getUserStatData);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div css={profilePageStyle}>
      <Header exit />
      <div css={profilePageBodyStyle}>
        <ProfileLeftSideContainer data={data} userInfo={userInfo} />
        <TabContainer data={data} />
      </div>
    </div>
  );
};

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

export default Profile;
