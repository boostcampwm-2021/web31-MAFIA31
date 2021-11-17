/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { citizen, mafia, primaryLight, white } from '@constants/colors';
import { ResultCard } from '@components/Card';
import { ButtonSizeList, ButtonThemeList, DefaultButton } from '@src/components/Button';
import { PlayerResult } from '@mafia/domain/types/game';
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '@src/contexts/userInfo';

const MAX_USER = 12;

interface LocationState {
  playerResultList: PlayerResult[];
}

const GameResult = () => {
  const location = useLocation<LocationState>();
  const { playerResultList } = location.state;
  const { userInfo } = useUserInfo();
  const myJob = playerResultList.find(
    (playerResult) => playerResult.userName === userInfo?.userName,
  )?.job;

  let winnerJob = playerResultList.find((playerResult) => playerResult.result === true)?.job;
  winnerJob = winnerJob !== 'mafia' ? 'citizen' : winnerJob;

  const winOrLose =
    (myJob !== 'mafia' && winnerJob === 'citizen') || myJob === winnerJob ? 'WIN' : 'LOSE';

  return (
    <div css={resultPageStyle}>
      <div css={resultTitleStyle}>
        <div css={teamResultTitleStyle}>
          <span css={teamResultTitleColorStyle(winnerJob!)}>{winnerJob!.toUpperCase()}</span> WIN!
        </div>
        <div css={personalResultTitleStyle}>YOU {winOrLose}</div>
      </div>
      <div css={resultCardListStyle(playerResultList.length)}>
        {playerResultList.map(({ userName, job, result }) => (
          <ResultCard key={userName} userName={userName} job={job} win={result} />
        ))}
      </div>
      <div css={buttonDivStyle}>
        <DefaultButton
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.DARK}
          imageSrc="/assets/icons/undo.svg"
          text="돌아가기"
          onClick={() => {}}
        />
        <DefaultButton
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.DARK}
          imageSrc="/assets/icons/exit.svg"
          text="방 나가기"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const resultPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

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
