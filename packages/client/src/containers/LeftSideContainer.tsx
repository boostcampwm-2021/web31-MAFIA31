import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerInfo } from '@src/types';
import { PlayerState } from '../../../domain/types/user';
import { AbilityButton } from '../components/Button';

type PropType = {
  playerStateList: PlayerState[];
  playerList: PlayerInfo[];
  voteUser: any;
};

const LeftSideContainer: FC<PropType> = ({ playerStateList, playerList, voteUser }) => (
  <div css={LeftSideContainerStyle}>
    <div css={AbilityStyle}>
      {playerList.map(({ userImg, userName, voteCnt }) => (
        <AbilityButton
          key={userName}
          userImg={userImg}
          userName={userName}
          voteCnt={voteCnt}
          isDead={playerStateList.filter((player) => player.userName === userName)[0].isDead}
          onClick={voteUser}
        />
      ))}
    </div>
  </div>
);

const LeftSideContainerStyle = css`
  display: flex;

  width: 400px;
  height: 100%;
  padding: 40px;
`;

const AbilityStyle = css`
  display: flex;
  flex-wrap: wrap;

  gap: 14px;
`;

export default LeftSideContainer;
