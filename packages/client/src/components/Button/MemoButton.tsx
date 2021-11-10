import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, grey3 } from '../../constants/colors';

interface PropType {
  userName: string;
  guessJob: string;
  isDead: boolean;
}

const MemoButton: FC<PropType> = ({ userName, guessJob, isDead }) => (
  <button type="button" css={buttonStyle(isDead)}>
    <img src={`/assets/images/${guessJob}.png`} alt={guessJob + userName} />
  </button>
);

const buttonStyle = (isDead: boolean) => css`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${isDead ? grey3 : white};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);

  img {
    width: 100%;
  }
`;

export default MemoButton;
