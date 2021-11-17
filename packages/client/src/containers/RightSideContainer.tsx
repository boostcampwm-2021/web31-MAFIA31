import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from '@mafia/domain/types/game';
import { grey1, titleActive, white, JOB_DICT } from '@constants/index';
import { SearchIcon } from '@components/Icon';
import { MemoButton, IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import { ImageSizeList, Image } from '@components/Image';
import { Memo } from '@src/types';
import { Modal } from '@src/components/Modal';

type PropType = {
  playerStateList: PlayerState[];
  memoList: Memo[];
  isNight: boolean;
  myJob: string;
};

const RightSideContainer: FC<PropType> = ({ playerStateList, memoList, isNight, myJob }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div css={rightSideContainerStyle(isNight)}>
      <div css={myJobStyle(isNight)}>
        <Image size={ImageSizeList.MEDIUM} src={`/assets/images/${myJob}.png`} />
        <div className="jobInfo">
          <span className="job">{JOB_DICT[myJob].title}</span>
          <p className="jobDescript">{JOB_DICT[myJob].description}</p>
        </div>
      </div>
      <hr css={hrStyle} />
      <div css={memoListStyle}>
        {memoList.map(({ userName, guessJob }) => (
          <div css={memoInfoStyle(isNight)} key={userName}>
            <MemoButton
              userName={userName}
              guessJob={guessJob}
              isDead={playerStateList.filter((player) => player.userName === userName)[0].isDead}
            />
            <span>{userName}</span>
          </div>
        ))}
      </div>
      <hr css={hrStyle} />
      <div css={modalWrapperStyle}>
        <Modal show={showModal} />
      </div>
      <div css={searchButtonStyle}>
        <IconButton
          icon={SearchIcon}
          size={ButtonSizeList.MEDIUM}
          theme={isNight ? ButtonThemeList.LIGHT : ButtonThemeList.DARK}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

const rightSideContainerStyle = (isNight: boolean) => css`
  position: relative;

  width: 23%;
  height: 100%;
  padding: 40px;

  color: ${isNight ? white : titleActive};
`;

const myJobStyle = (isNight: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${isNight ? white : titleActive};
  gap: 14px;

  .jobInfo {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 10px;

    .job {
      font-weight: bold;
      font-size: 18px;
    }
    .jobDescript {
      font-size: 15px;
    }
  }
`;

const hrStyle = css`
  border: 0;
  margin: 24px 0;
  border-top: 1px solid ${grey1};
`;

const memoListStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 8px 5%;
`;

const memoInfoStyle = (isNight: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
  width: 30%;
  font-size: 12px;
  color: ${isNight ? white : titleActive};
`;

const searchButtonStyle = () => css`
  position: absolute;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
`;

const modalWrapperStyle = () => css`
  position: absolute;
  right: 70px;
  bottom: 70px;
`;

export default RightSideContainer;
