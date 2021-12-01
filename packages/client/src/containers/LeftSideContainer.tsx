import { FC, useCallback, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import useModal from '@hooks/useModal';
import { titleActive, white, grey1 } from '@constants/index';
import { RoomOutIcon, AudioOffIcon, AudioOnIcon } from '@components/Icon';
import { IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import { GAME_DAY_MP3 } from '@constants/audio';
import useAudio from '@src/hooks/useAudio';
import { User } from '@mafia/domain/types/user';
import AbilityButtonList from '@src/lists/AbilityButtonList';
import { useUserInfo } from '@src/contexts/userInfo';
import Timer from '@src/components/Timer';
import useAbility from '@hooks/useAbility';
import GamePageModalContainer from './GamePageModalContainer';

type PropType = {
  initPlayers: User[];
  isNight: boolean;
  myJob: string;
};

const LeftSideContainer: FC<PropType> = ({ initPlayers, isNight, myJob }) => {
  const { userInfo } = useUserInfo();
  const { players, mafias, selected, emitAbility, getSelectedImg } = useAbility(
    initPlayers,
    isNight,
    myJob,
  );
  const {
    isModalOpen: isRoomOutModalOpen,
    openModal: openRoomOutModal,
    closeModal: closeRoomOutModal,
  } = useModal();

  const { playing, updateLoop, toggle, pause } = useAudio(GAME_DAY_MP3);

  const amIDead = useCallback(
    () => players.find(({ userName: playerName }) => playerName === userInfo?.userName)?.isDead,
    [players],
  );

  useEffect(() => {
    updateLoop(true);
    toggle();

    return () => {
      pause();
    };
  }, []);

  return (
    <div css={leftSideContainerStyle}>
      <GamePageModalContainer
        amIDead={amIDead}
        isRoomOutModalOpen={isRoomOutModalOpen}
        closeRoomOutModal={closeRoomOutModal}
      />
      <div css={Style}>
        <img
          src={isNight ? '/assets/images/moon.png' : '/assets/images/sun.png'}
          alt="day-night-state"
        />
        <div css={roomActionStyle(isNight)}>
          <span>ROOM NAME</span>
          <div css={roomIconButtonsStyle(isNight)}>
            <IconButton
              icon={playing ? AudioOnIcon : AudioOffIcon}
              size={ButtonSizeList.LARGE}
              theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
              onClick={toggle}
            />
            <IconButton
              icon={RoomOutIcon}
              size={ButtonSizeList.LARGE}
              theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
              onClick={openRoomOutModal}
            />
          </div>
        </div>
      </div>
      <Timer />
      <hr css={hrStyle} />
      <AbilityButtonList
        players={players}
        mafias={mafias}
        selected={selected}
        emitAbility={emitAbility}
        getSelectedImg={getSelectedImg}
        amIDead={amIDead() ?? false}
      />
    </div>
  );
};

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

const hrStyle = css`
  border: 0;
  margin: 24px 0;
  border-top: 1px solid ${grey1};
`;

export default LeftSideContainer;
