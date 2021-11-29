/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { citizen, mafia, primaryLight, white, titleActive } from '@constants/colors';
import { ButtonSizeList, ButtonThemeList, DefaultButton } from '@src/components/Button';
import { PlayerResult } from '@mafia/domain/types/game';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useUserInfo } from '@src/contexts/userInfo';
import ResultCardList from '@src/lists/ResultCardList';

interface LocationState {
  playerResultList: PlayerResult[];
}

const GameResult = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const { userInfo } = useUserInfo();

  if (!location.state) {
    history.push('/');
    return <></>;
  }
  const { playerResultList } = location.state;

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
        <span css={teamResultTitleStyle}>
          <span css={teamResultTitleColorStyle(winnerJob!)}>{winnerJob!.toUpperCase()}</span> WIN!
        </span>
        <span css={personalResultTitleStyle}>YOU {winOrLose}</span>
      </div>
      <ResultCardList playerResultList={playerResultList} />
      <div css={buttonDivStyle}>
        <DefaultButton
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.DARK}
          imageSrc="/assets/icons/back.svg"
          text="돌아가기"
          onClick={() => {}}
        />
        <Link to="/rooms">
          <DefaultButton
            size={ButtonSizeList.MEDIUM}
            theme={ButtonThemeList.DARK}
            imageSrc="/assets/icons/logout.svg"
            text="방 나가기"
          />
        </Link>
      </div>
    </div>
  );
};

const resultPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  padding: 40px;
  color: ${titleActive};
  background-color: ${primaryLight};
`;

const resultTitleStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
  padding: 24px 200px 16px;
  border-radius: 20px;
  background-color: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
`;

const teamResultTitleStyle = css`
  font-weight: bold;
  font-size: 35px;
`;

const teamResultTitleColorStyle = (team: string) => css`
  color: ${team === 'mafia' ? mafia : citizen};
`;

const personalResultTitleStyle = css`
  font-weight: bold;
  font-size: 80px;
`;

const buttonDivStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default GameResult;
