import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3 } from '../../constants/colors';

interface PropType {
  userImg: string;
  userName: string;
  voteCnt: number;
  isDead: boolean;
  onClick: any;
}

const AbilityButton: FC<PropType> = ({ userImg, userName, voteCnt, isDead, onClick }) => (
  <button type="button" css={buttonStyle(isDead)} onClick={() => onClick(userName)}>
    <img src={userImg} alt="" css={userImgStyle} />
    <div css={voteInfoStyle}>
      <span>{userName}</span>
      <p>{'💜'.repeat(voteCnt)}</p>
    </div>
  </button>
);

const buttonStyle = (isDead: boolean) => css`
  display: flex;
  align-items: center;
  background-color: ${isDead ? grey3 : white};

  padding: 12px;
  width: 152px;
  height: 75px;
  border-radius: 15px;
`;

const userImgStyle = css`
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;

const voteInfoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3px;
  width: 110px;

  span {
    font-size: 10px;
    font-weight: bold;
    color: ${titleActive};
  }

  p {
    width: 61px;
    font-size: 9px;
  }
`;

export default AbilityButton;
