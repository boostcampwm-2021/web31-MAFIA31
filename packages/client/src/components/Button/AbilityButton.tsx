import { FC, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white, titleActive, grey3, mafia } from '@constants/colors';
import { VoteIcon } from '@components/Icon';
import { PUBLISH_VICTIM } from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';

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
}) => {
  const [victim, setVictim] = useState('');
  const { socketRef } = useSocketContext();

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VICTIM, (v: string) => {
      setVictim(v);
      setTimeout(() => {
        setVictim('');
      }, 1000);
    });
    return () => {
      socketRef.current?.off(PUBLISH_VICTIM);
    };
  }, [socketRef.current]);

  return (
    <button
      type="button"
      css={
        isNight ? buttonStyleNight(isDead, selectedByMe, selectedByOthers) : buttonStyleDay(isDead)
      }
      onClick={() => onClick(userName)}
    >
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
      <div css={abilityStyle}>
        {victim === userName ? (
          <img css={skullImageStyle} src="assets/images/skull.png" alt="skull" />
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

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
  width: 18px;
  height: 18px;
`;

const abilityStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 8px;
  width: 100%;
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
  img {
    width: 10px;
    height: 10px;
  }
`;

const skullImageStyle = css`
  width: 10px;
  height: 10px;

  animation-name: pulse;
  animation-duration: 0.5s;
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
      transform: scale(1);
    }
  }
`;

export default AbilityButton;
