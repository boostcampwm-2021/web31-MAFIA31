import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3 } from '@constants/colors';
import { VoteIcon } from '@components/Icon';

interface PropType {
  userImg: string;
  userName: string;
  voteFrom: string[];
  isDead: boolean;
  onClick: any;
}

const AbilityButton: FC<PropType> = ({ userImg, userName, voteFrom, isDead, onClick }) => (
  <button type="button" css={buttonStyle(isDead)} onClick={() => onClick(userName)}>
    <img src={userImg} alt="" css={userImgStyle} />
    <div css={voteInfoStyle}>
      <span>{userName}</span>
      {!voteFrom.length ? (
        <></>
      ) : (
        <div>
          {voteFrom.map((voteUser) => (
            <VoteIcon key={voteUser} />
          ))}
        </div>
      )}
    </div>
  </button>
);

const buttonStyle = (isDead: boolean) => css`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${isDead ? grey3 : white};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);

  padding: 12px;
  width: 48%;
  min-height: 75px;
  border-radius: 15px;
`;

const userImgStyle = css`
  width: 18px;
  height: 18px;
`;

const voteInfoStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 8px;
  width: 100%;

  span {
    font-size: 12px;
    font-weight: bold;
    color: ${titleActive};
  }

  div {
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    padding: 0 10px;

    img {
      width: 10px;
      height: 10px;
    }
  }
`;

export default AbilityButton;
