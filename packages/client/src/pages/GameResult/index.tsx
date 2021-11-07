/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryLight } from '../../constants/colors';
import { ResultCard } from '../../components/Card';

const GameResult = () => {
  const temp = '';
  return (
    <div css={ResultPageStyle}>
      <div>
        <div>MAFIA WIN!</div>
        <div>YOU LOSE</div>
      </div>
      <ResultCard userName="user1" job="mafia" isWinner />
      <div>{temp}</div>
      <div>
        <button type="button">돌아가기</button>
        <button type="button">방 나가기</button>
      </div>
    </div>
  );
};

const ResultPageStyle = css`
  display: flex;
  flex-direction: column;
  height: 100vh;

  background: ${primaryLight};
`;

export default GameResult;
