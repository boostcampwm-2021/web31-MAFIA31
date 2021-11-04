import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AbilityButton } from '../components/Button';
import useVote from '../hooks/useVote';

type PropType = {
  roomId: string;
};

const LeftSideContainer: FC<PropType> = ({ roomId }) => {
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
