import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { citizen, mafia, primaryLight, white } from '@constants/colors';
import { ResultCard } from '@components/Card';

interface PlayerResult {
  userName: string;
  job: string;
  isWinner: boolean;
}

const MAX_USER = 12;

const GameResult = () => {
  const [playerResultList] = useState<PlayerResult[]>([
    { userName: 'user1', job: 'mafia', isWinner: true },
    { userName: 'user2', job: 'mafia', isWinner: true },
    { userName: 'user3', job: 'citizen', isWinner: false },
    { userName: 'user4', job: 'citizen', isWinner: false },
    { userName: 'user5', job: 'citizen', isWinner: false },
    { userName: 'user6', job: 'mafia', isWinner: true },
    { userName: 'user7', job: 'citizen', isWinner: false },
    { userName: 'user8', job: 'mafia', isWinner: true },
    { userName: 'user9', job: 'citizen', isWinner: false },
    { userName: 'user10', job: 'mafia', isWinner: true },
    { userName: 'user11', job: 'mafia', isWinner: true },
    { userName: 'user12', job: 'citizen', isWinner: false },
  ]);
  return (
    <div css={resultPageStyle}>
      <div css={resultTitleStyle}>
        <div css={teamResultTitleStyle}>
          <span css={teamResultTitleColorStyle('mafia')}>MAFIA</span> WIN!
        </div>
        <div css={personalResultTitleStyle}>YOU LOSE</div>
      </div>
      <div css={resultCardListStyle(playerResultList.length)}>
        {playerResultList.map(({ userName, job, isWinner }) => (
          <ResultCard key={userName} userName={userName} job={job} isWinner={isWinner} />
        ))}
      </div>
      <div css={buttonDivStyle} />
    </div>
  );
};

const resultPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;

  background: ${primaryLight};
`;

const resultTitleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 40px;

  position: relative;
  width: 1011px;
  height: 181px;

  background-color: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

const teamResultTitleStyle = css`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 41px;
`;

const teamResultTitleColorStyle = (team: string) => css`
  color: ${team === 'mafia' ? mafia : citizen};
`;

const personalResultTitleStyle = css`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 100px;
  line-height: 117px;
`;

const resultCardListStyle = (count: number) => css`
  display: grid;
  grid-template-columns: repeat(${count <= MAX_USER / 2 ? count : Math.round(count / 2)}, 1fr);
  grid-template-rows: repeat(${count <= MAX_USER / 2 ? 1 : 2}, 1fr);
  margin: 80px 0px;
  gap: 37px;
`;

const buttonDivStyle = css`
  display: flex;
  align-items: center;
  gap: 411px;
  margin-bottom: 40px;
`;

export default GameResult;
