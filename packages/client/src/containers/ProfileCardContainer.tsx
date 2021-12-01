/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ProfileCard } from '@src/components/Card';
import { memo } from 'react';

interface PropType {
  userName: string;
  isHost: boolean;
  profileImg: string;
  isReady: boolean;
}

const ProfileCardContainer = memo(({ userName, isHost, profileImg, isReady }: PropType) => (
  <div key={userName} css={wrapperStyle}>
    <img css={decoStyle(isHost)} src="\assets\icons\host.png" alt="host" />
    <ProfileCard
      userName={userName}
      status={isHost ? 'WAITING' : 'READY'}
      profileImg={profileImg}
      fill={isReady}
    />
  </div>
));

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

export default ProfileCardContainer;
