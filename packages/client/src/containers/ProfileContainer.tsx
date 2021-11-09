import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { User } from 'domain/types/user';
import { ProfileCard } from '@src/components/Card';

interface Prop {
  userList: User[];
  host: string;
}

const ProfileContainer: FC<Prop> = ({ userList, host }) => (
  <div css={containerStyle}>
    {userList.map(({ userName }) => (
      <ProfileCard
        key={userName}
        userName={userName}
        status={userName === host ? 'WAITING' : 'READY'}
        profileImg="assets/images/mafia.png"
        fill="true"
      />
    ))}
  </div>
);

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 55px;
  column-gap: 40px;

  width: 920px;
`;

export default ProfileContainer;
