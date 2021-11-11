import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from '@mafia/domain/types/user';
import { PlayerInfo } from '@src/types';
import { titleActive, white, grey1 } from '@constants/index';
import { AbilityButton, IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import { SettingIcon, RoomOutIcon } from '@components/Icon';
import { MafiaPick } from '@mafia/domain/types/game';

type PropType = {
  playerStateList: PlayerState[];
  playerList: PlayerInfo[];
  voteUser: any;
  myUserName: string;
  emitAbility: any;
  mafiaPickList: MafiaPick[];
  isNight: boolean;
  socketRef: any;
};

const LeftSideContainer: FC<PropType> = ({
  playerStateList,
  playerList,
  voteUser,
  myUserName,
  emitAbility,
  isNight,
  mafiaPickList,
  socketRef,
}) => (
  <div css={leftSideContainerStyle}>
    <div css={Style}>
      <img
        src={isNight ? '/assets/images/moon.png' : '/assets/images/sun.png'}
        alt="day-night-state"
      />
      <div css={roomActionStyle(isNight)}>
        <span>ROOM NAME</span>
        <div css={roomIconButtonsStyle(isNight)}>
          <IconButton
            icon={SettingIcon}
            size={ButtonSizeList.LARGE}
            theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
            onClick={() => {}}
          />
          <IconButton
            icon={RoomOutIcon}
            size={ButtonSizeList.LARGE}
            theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>

    <div css={timerStyle}>
      <span>00:00</span>
    </div>
    <hr css={hrStyle} />
    <div css={abilityListStyle}>
      {playerList.map(({ userImg, userName, voteFrom }) => (
        <AbilityButton
          key={userName}
          socketRef={socketRef}
          isNight={isNight}
          userImg={userImg}
          userName={userName}
          voteFrom={voteFrom}
          selectedByMe={mafiaPickList.some(
            (pick) => pick.mafia === myUserName && pick.victim === userName,
          )}
          selectedByOthers={mafiaPickList.some(
            (pick) => pick.mafia !== myUserName && pick.victim === userName,
          )}
          isDead={playerStateList.find((player) => player.userName === userName)?.isDead || false}
          onClick={isNight ? emitAbility : voteUser}
        />
      ))}
    </div>
  </div>
);
const leftSideContainerStyle = css`
  width: 27%;
  height: 100%;
  padding: 40px;
`;

const Style = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;

  img {
    width: 100px;
    height: 100px;
  }
`;

const roomActionStyle = (isNight: boolean) => css`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: end;
  color: ${isNight ? white : titleActive};

  gap: 16px;
  font-size: 30px;
`;

const roomIconButtonsStyle = (isNight: boolean) => css`
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  button {
    border: 2px solid ${isNight ? white : titleActive};
    border-radius: 15px;
  }
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

const abilityListStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 16px 4%;
`;

export default LeftSideContainer;
