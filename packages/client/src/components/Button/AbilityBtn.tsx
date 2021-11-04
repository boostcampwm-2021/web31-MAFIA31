import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive } from '../../constants/colors';

interface PropType {
  userImg: string;
  nickName: string;
  voteCnt: number;
}

const AbilityBtn: FC<PropType> = ({ userImg, nickName, voteCnt }) => (
  <button type="button" css={BtnContainerStyle}>
    <img src={userImg} alt="" css={userImgStyle} />
    <div css={VoteCotnainerStyle}>
      <span>{nickName}</span>
      <p>{'💜'.repeat(voteCnt)}</p>
    </div>
  </button>
);

const BtnContainerStyle = css`
  display: flex;
  align-items: center;
  background-color: ${white};

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

const VoteCotnainerStyle = css`
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

export default AbilityBtn;
