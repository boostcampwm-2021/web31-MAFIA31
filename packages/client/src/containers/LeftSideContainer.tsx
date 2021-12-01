import { FC, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';

import useModal from '@hooks/useModal';
import { titleActive, white, grey1 } from '@constants/index';
import { RoomOutIcon, AudioOffIcon, AudioOnIcon } from '@components/Icon';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import { GAME_DAY_MP3 } from '@constants/audio';
import useAudio from '@src/hooks/useAudio';
import { Player, Selected } from '@src/types';
import useExecutionModal from '@src/hooks/useExecutionModal';
import AbilityButtonList from '@src/lists/AbilityButtonList';
import { useUserInfo } from '@src/contexts/userInfo';
import Timer from '@src/components/Timer';

type PropType = {
  players: Player[];
  mafias: string[];
  selected: Selected;
  isNight: boolean;
  getSelectedImg: any;
  emitAbility: any;
};

const LeftSideContainer: FC<PropType> = ({
  players,
  mafias,
  selected,
  isNight,
  getSelectedImg,
  emitAbility,
}) => {
  const history = useHistory();

  const { userInfo } = useUserInfo();

  const {
    isModalOpen: isRoomOutModalOpen,
    openModal: openRoomOutModal,
    closeModal: closeRoomOutModal,
  } = useModal();

  const {
    isModalOpen: isExecutionModalOpen,
    maxVotedPlayer,
    closeModal: closeExecutionModal,
    executionHandler,
  } = useExecutionModal();

  const { playing, updateLoop, toggle, pause } = useAudio(GAME_DAY_MP3);

  const roomOutHandler = () => {
    history.push('/rooms');
    closeRoomOutModal();
  };

  const amIDead = () =>
    players.find(({ userName: playerName }) => playerName === userInfo?.userName)?.isDead;

  useEffect(() => {
    updateLoop(true);
    toggle();

    return () => {
      pause();
    };
  }, []);

  return (
    <div css={leftSideContainerStyle}>
      <ConfirmModal
        isOpen={isRoomOutModalOpen}
        onRequestClose={closeRoomOutModal}
        eventHandler={roomOutHandler}
        closeModal={closeRoomOutModal}
      >
        <p>진행중인 게임을 포기하고 나가시겠습니까?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={amIDead() ? false : isExecutionModalOpen}
        eventHandler={executionHandler}
        closeModal={closeExecutionModal}
      >
        <p>{maxVotedPlayer}을(를) 투표로 처형할까요?</p>
      </ConfirmModal>
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
