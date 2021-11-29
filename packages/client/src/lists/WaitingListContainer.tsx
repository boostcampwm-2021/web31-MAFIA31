import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ProfileCard } from '@src/components/Card';
import { PlayerInfo } from '@mafia/domain/types/user';

interface Prop {
  userList: PlayerInfo[];
}

const WaitingList: FC<Prop> = ({ userList }) => (
  <div css={containerStyle}>
    {userList.map(({ userName, profileImg, isHost, isReady }) => (
      <div key={userName} css={wrapperStyle}>
        <img css={decoStyle(isHost)} src="\assets\icons\host.png" alt="host" />
        <ProfileCard
          userName={userName}
          status={isHost ? 'WAITING' : 'READY'}
          profileImg={profileImg}
          fill={isReady}
        />
      </div>
    ))}
  </div>
);

const containerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;

  gap: 55px 40px;
  padding: 40px 0;
  max-width: 930px;
  width: 75%;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const wrapperStyle = css`
  position: relative;
`;

const decoStyle = (isHost: boolean) => (isHost ? iconStyle : iconNone);

const iconStyle = css`
  position: absolute;
  right: -25px;
  top: -35px;
`;
const iconNone = css`
  display: none;
`;

export default WaitingList;
