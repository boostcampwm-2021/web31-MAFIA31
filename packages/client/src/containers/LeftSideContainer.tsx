import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerState } from '../../../domain/types/user';
import { AbilityButton } from '../components/Button';
import useVote from '../hooks/useVote';

type PropType = {
  roomId: string;
  playerStateList: PlayerState[];
};

const LeftSideContainer: FC<PropType> = ({ roomId, playerStateList }) => {
  const { playerList, voteUser } = useVote('mafia31', roomId);

  return (
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
};

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
