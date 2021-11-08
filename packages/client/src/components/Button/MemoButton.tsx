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
    <img src="" alt="" />
    <div>{userName}</div>
    <div>{guessJob}</div>
  </button>
);

const buttonStyle = (isDead: boolean) => css`
  display: flex;
  align-items: center;
  padding: 16px;

  width: 84px;
  height: 84px;

  background-color: ${isDead ? grey3 : white};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

export default MemoButton;
