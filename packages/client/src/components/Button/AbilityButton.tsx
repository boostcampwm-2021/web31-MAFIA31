/* eslint-disable no-nested-ternary */
import { memo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3, mafia } from '@constants/colors';
import { VoteIcon } from '@components/Icon';
import { Player } from '@src/types';

interface PropType {
  player: Player;
  isMafia: boolean;
  stamp: string;
  onClick: any;
}

const AbilityButton = memo(({ player, isMafia, stamp, onClick }: PropType) => {
  const { userName, profileImg, isDead, voteCount } = player;

  const iconList = () => {
    const arr = Array.from({ length: voteCount }, (_, idx) => idx);
    return arr.map((e) => <VoteIcon key={e} />);
  };

  const handleClick = () => {
    onClick(userName, isDead);
  };

  return (
    <button type="button" css={buttonStyle(isDead)} onClick={handleClick}>
      <img src={profileImg} alt="profile" css={userImgStyle} />
      <div css={voteInfoStyle(isMafia)}>
        <span>{userName}</span>
        {voteCount ? <div>{iconList()}</div> : <></>}
      </div>
      {!stamp ? (
        <></>
      ) : (
        <img src={`/assets/images/${stamp}.png`} alt="skill icon" css={abilityStyle} />
      )}
    </button>
  );
});

const buttonStyle = (isDead: boolean) => css`
  cursor: ${isDead ? 'auto' : 'pointer'};
  position: relative;
  display: flex;
  align-items: center;

  width: 48%;
  min-height: 75px;
  padding: 12px;
  border-radius: 15px;
  background-color: ${isDead ? grey3 : white};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);
`;

const userImgStyle = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const voteInfoStyle = (isMafia: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 8px;
  width: 100%;

  span {
    font-size: 12px;
    font-weight: bold;
    color: ${isMafia ? mafia : titleActive};
  }

  div {
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    padding: 0 10px;
  }
`;

const abilityStyle = css`
  position: absolute;
  width: 30px;
  height: 30px;
  left: calc(50% - 5px);
  animation: pulse 0.1s forwards;

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.5;
      transform-origin: 50% 50%;
      transform: rotate(0.2turn) scale(5);
      transition: all 0.3s ease-out;
    }
    100% {
      opacity: 1;
      transform: rotate(-0.05turn) scale(1);
    }
  }
`;

export default AbilityButton;
