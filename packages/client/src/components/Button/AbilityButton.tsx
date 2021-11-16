import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3, mafia } from '@constants/colors';
import { VoteIcon } from '@components/Icon';

interface PropType {
  isNight: boolean;
  userImg: string;
  userName: string;
  voteFrom: string[];
  isDead: boolean;
  selectedByMe: boolean;
  selectedByOthers: boolean;
  onClick: any;
}

const AbilityButton: FC<PropType> = ({
  isNight,
  userImg,
  userName,
  voteFrom,
  isDead,
  selectedByMe,
  selectedByOthers,
  onClick,
}) => (
  <button
    type="button"
    css={
      isNight ? buttonStyleNight(isDead, selectedByMe, selectedByOthers) : buttonStyleDay(isDead)
    }
    onClick={() => onClick(userName)}
  >
    <img src={userImg} alt="profile_img" css={userImgStyle} />
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

const buttonStyleNight = (isDead: boolean, selectedByMe: boolean, selectedByOthers: boolean) => css`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${isDead ? grey3 : white};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);

  padding: 12px;
  width: 48%;
  min-height: 75px;
  border-radius: 15px;
  border: 1px solid ${selectedByMe ? mafia : 'none'};
  font-size: ${selectedByOthers}; // 수정 필요
`;

const buttonStyleDay = (isDead: boolean) => css`
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
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
  }
`;
export default AbilityButton;
