import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ProfileCard } from '@src/components/Card';
import { PlayerInfo } from '@mafia/domain/types/user';

interface Prop {
  userList: PlayerInfo[];
}

const WaitingListContainer: FC<Prop> = ({ userList }) => (
  <div css={containerStyle}>
    {userList.map(({ userName, isHost, isReady }) => (
      <div key={userName} css={wrapperStyle}>
        <img css={decoStyle(isHost)} src="\assets\icons\host.png" alt="host" />
        <ProfileCard
          userName={userName}
          status={isHost ? 'WAITING' : 'READY'}
          profileImg="assets/images/mafia.png"
          fill={isReady}
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

const decoStyle = (isHost: boolean) => (isHost ? iconStyle : iconNone);

const iconStyle = css`
  position: absolute;
  right: -30px;
  top: -30px;
`;
const iconNone = css`
  display: none;
`;

export default WaitingListContainer;
