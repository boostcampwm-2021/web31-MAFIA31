import { FC } from 'react';
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
import AbilityButtonList from '@src/lists/AbilityButtonList';

type PropType = {
  players: Player[];
  mafias: string[];
  selected: Selected;
  timer: string;
  isNight: boolean;
  getSelectedImg: any;
  emitAbility: any;
};

const LeftSideContainer: FC<PropType> = ({
  players,
  mafias,
  selected,
  timer,
  isNight,
  getSelectedImg,
  emitAbility,
}) => {
  const history = useHistory();

  const { isModalOpen, openModal, closeModal } = useModal();
  const { playing, toggleAudio } = useAudio(GAME_DAY_MP3);

  const roomOutHandler = () => {
    history.push('/rooms');
    closeModal();
  };

  return (
    <div css={leftSideContainerStyle}>
      <ConfirmModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        eventHandler={roomOutHandler}
        closeModal={closeModal}
      >
        <p>진행중인 게임을 포기하고 나가시겠습니까?</p>
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
              icon={playing ? AudioOffIcon : AudioOnIcon}
              size={ButtonSizeList.LARGE}
              theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
              onClick={toggleAudio}
            />
            <IconButton
              icon={RoomOutIcon}
              size={ButtonSizeList.LARGE}
              theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
              onClick={openModal}
            />
          </div>
        </div>
      </div>

      <div css={timerStyle}>
        <span>{timer}</span>
      </div>
      <hr css={hrStyle} />
      <AbilityButtonList
        players={players}
        mafias={mafias}
        selected={selected}
        emitAbility={emitAbility}
        getSelectedImg={getSelectedImg}
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

export default LeftSideContainer;
