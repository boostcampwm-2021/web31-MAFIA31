import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AbilityBtn } from '../components/Button';
import { primaryDark } from '../constants/colors';
import useVote from '../hooks/useVote';

const VoteContainer: FC = () => {
  const { playerList } = useVote('mafia31', 'hi');

  return (
    <div css={VoteContainerStyle}>
      {playerList.map(({ userImg, nickname, voteCnt }) => (
        <AbilityBtn key={nickname} userImg={userImg} nickName={nickname} voteCnt={voteCnt} />
      ))}
    </div>
  );
};

const VoteContainerStyle = css`
  display: flex;
  background-color: ${primaryDark};

  padding: 40px;
  width: 400px;
  height: 100%;
`;

export default VoteContainer;
