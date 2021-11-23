/* eslint-disable no-nested-ternary */
import { FC, useMemo } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3, mafia } from '@constants/colors';
import { VoteIcon } from '@components/Icon';
import { BULLET_MP3, HEAL_MP3 } from '@constants/audio';

interface PropType {
  isNight: boolean;
  userImg: string;
  userName: string;
  voteCount: number;
  isDead: boolean;
  isMafia: boolean;
  isVictim: boolean;
  isSurvivor: boolean;
  onClick: any;
  myJob: string;
  amIDead: boolean;
}

const AbilityButton: FC<PropType> = ({
  isNight,
  userImg,
  userName,
  voteCount,
  isDead,
  isMafia,
  isVictim,
  isSurvivor,
  onClick,
  myJob,
  amIDead,
}) => {
  const iconList = () => {
    const arr = Array.from({ length: voteCount }, (_, idx) => idx);
    return arr.map((e) => <VoteIcon key={e} />);
  };

  const handleClick = () => {
    onClick(userName);
    setAudio();
  };

  const setAudio = () => {
    if (isNight && !amIDead) {
      const audio = new Audio();
      if (myJob === 'mafia') {
        audio.src = BULLET_MP3;
      } else if (myJob === 'doctor') {
        audio.src = HEAL_MP3;
      } else if (myJob === 'police') {
        audio.src = HEAL_MP3;
      }
      audio.load();
      audio.play();
    }
  };

  let abilityState = <></>;
  if (isNight && isVictim) {
    abilityState = <img src="/assets/images/bullet.png" alt="bullet" />;
  } else if (isNight && isSurvivor) {
    abilityState = <img src="/assets/images/healthcare.png" alt="cure" />;
  } else if (!isNight && voteCount) {
    abilityState = <div>{useMemo(() => iconList(), [voteCount])}</div>;
  }

  return (
    <button
      type="button"
      css={isNight ? buttonStyleNight(isDead) : buttonStyleDay(isDead)}
      onClick={handleClick}
    >
      <img src={userImg} alt="profile_img" css={userImgStyle} />
      <div css={voteInfoStyle(isMafia)}>
        <span>{userName}</span>
        {abilityState}
      </div>
    </button>
  );
};

const buttonStyleNight = (isDead: boolean) => css`
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

  img {
    width: 30px;
    height: 30px;

    animation-name: pulse;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;

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
  }
`;

export default AbilityButton;
