/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryLight, white } from '../../constants/colors';
import { ResultCard } from '../../components/Card';
import { IconButton } from '../../components/Button';
import { ButtonSizeList, ButtonThemeList } from '../../components/Button/IconButton';

const GameResult = () => {
  const temp = '';
  return (
    <div css={ResultPageStyle}>
      <div css={ResultTitleStyle}>
        <div>MAFIA WIN!</div>
        <div>YOU LOSE</div>
      </div>
      <ResultCard userName="user1" job="mafia" isWinner />
      <div>{temp}</div>
      <div>
        <IconButton
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.DARK}
          imageSrc="/assets/icons/undo.png"
          text="돌아가기"
          onClick={() => {}}
        />
        <IconButton
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.DARK}
          imageSrc="/assets/icons/exit.png"
          text="방 나가기"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const ResultPageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  background: ${primaryLight};
`;

const ResultTitleStyle = css`
  position: relative;
  width: 1011px;
  height: 181px;

  background-color: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

export default GameResult;
