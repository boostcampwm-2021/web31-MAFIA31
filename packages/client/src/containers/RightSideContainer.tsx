import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from 'domain/types/user';
import MemoButton from '@components/Button/MemoButton';
import { grey1 } from '@constants/index';

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
      <hr css={hrStyle} />
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
      <hr css={hrStyle} />
    </div>
  );
};

const RightSideContainerStyle = css`
  width: 23%;
  height: 100%;
  padding: 40px;
`;

const hrStyle = css`
  border: 0;
  margin: 24px 0;
  border-top: 1px solid ${grey1};
`;

export default RightSideContainer;
