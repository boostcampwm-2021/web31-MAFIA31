import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerInfo } from '@mafia/domain/types/user';
import ProfileCardContainer from '@src/containers/ProfileCardContainer';

interface Prop {
  userList: PlayerInfo[];
}

const WaitingList: FC<Prop> = ({ userList }) => (
  <div css={containerStyle}>
    {userList.map(({ userName, profileImg, isHost, isReady }) => (
      <ProfileCardContainer
        key={userName}
        userName={userName}
        profileImg={profileImg}
        isHost={isHost}
        isReady={isReady}
      />
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

export default WaitingList;
