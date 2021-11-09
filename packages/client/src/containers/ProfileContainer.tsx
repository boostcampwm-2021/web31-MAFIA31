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
      <div css={wrapperStyle}>
        <img
          css={decoStyle[host === userName ? 'true' : 'false']}
          src="\assets\icons\host.png"
          alt="host"
        />
        <ProfileCard
          key={userName}
          userName={userName}
          status={userName === host ? 'WAITING' : 'READY'}
          profileImg="assets/images/mafia.png"
          fill="true"
        />
      </div>
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

const wrapperStyle = css`
  position: relative;
`;

const decoStyle = {
  true: css`
    position: absolute;
    right: -30px;
    top: -30px;
  `,
  false: css`
    display: none;
  `,
};

export default ProfileContainer;
