import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerState } from '../../../domain/types/user';
import MemoButton from '../components/Button/MemoButton';

type PropType = {
  playerStateList: PlayerState[];
};

interface Memo {
  userName: string;
  guessJob: string;
}

const RightSideContainer: FC<PropType> = ({ playerStateList }) => {
  const [memoList] = useState<Memo[]>([
    { userName: 'user1', guessJob: 'mafia' },
    { userName: 'user2', guessJob: 'citizen' },
    { userName: 'user3', guessJob: 'doctor' },
  ]);

  return (
    <div css={RightSideContainerStyle}>
      <div>
        {memoList.map(({ userName, guessJob }) => (
          <MemoButton
            key={userName}
            userName={userName}
            guessJob={guessJob}
            isDead={playerStateList.filter((player) => player.userName === userName)[0].isDead}
          />
        ))}
      </div>
    </div>
  );
};

const RightSideContainerStyle = css`
  display: flex;

  width: 400px;
  height: 100%;
  padding: 40px;
`;

export default RightSideContainer;
