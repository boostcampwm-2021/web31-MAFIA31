import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryLight } from '../constants/index';
import { AbilityButton } from '../components/Button';
import useVote from '../hooks/useVote';

type PropType = {
  roomId: string;
};

const LeftSideContainer: FC<PropType> = ({ roomId }) => {
  const { playerList, voteUser } = useVote('mafia31', roomId);

  return (
    <div css={LeftSideContainerStyle}>
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
  );
};

const LeftSideContainerStyle = css`
  display: flex;

  width: 400px;
  height: 100%;
  padding: 40px;
  background: ${primaryLight};
`;

export default LeftSideContainer;
