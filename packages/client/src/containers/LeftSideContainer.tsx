import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from 'domain/types/user';
import { titleActive, white, grey1 } from '@constants/index';
import { AbilityButton } from '@components/Button';
import { PlayerInfo } from '@src/types';

type PropType = {
  playerStateList: PlayerState[];
  playerList: PlayerInfo[];
  voteUser: any;
};

const LeftSideContainer: FC<PropType> = ({ playerStateList, playerList, voteUser }) => (
  <div css={LeftSideContainerStyle}>
    <div css={timerStyle}>
      <span>00:00</span>
    </div>
    <hr css={hrStyle} />
    <div css={AbilityStyle}>
      {playerList.map(({ userImg, userName, voteFrom }) => (
        <AbilityButton
          key={userName}
          userImg={userImg}
          userName={userName}
          voteFrom={voteFrom}
          isDead={playerStateList.find((player) => player.userName === userName)?.isDead || false}
          onClick={voteUser}
        />
      ))}
    </div>
  </div>
);

const LeftSideContainerStyle = css`
  width: 27%;
  height: 100%;
  padding: 40px;
`;

const timerStyle = css`
  padding: 10px;
  border-radius: 15px;
  background-color: ${white};
  box-shadow: 0px 4px 4px rgba(78, 65, 109, 0.25);

  span {
    display: block;
    font-weight: bold;
    text-align: center;

    height: 70px;
    font-size: 48px;
    line-height: 80px;
    letter-spacing: 0.1em;
    color: ${titleActive};
  }
`;

const hrStyle = css`
  border: 0;
  margin: 24px 0;
  border-top: 1px solid ${grey1};
`;

const AbilityStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 16px 4%;
`;

export default LeftSideContainer;
