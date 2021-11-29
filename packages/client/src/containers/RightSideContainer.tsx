import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Player, Memo } from '@src/types';
import { grey1, titleActive, white, JOB_DICT } from '@constants/index';
import { Modal } from '@components/Modal';
import { SearchIcon } from '@components/Icon';
import { ImageSizeList, Image } from '@components/Image';
import { IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import MemoList from '@src/lists/MemoList';

type PropType = {
  players: Player[];
  memoList: Memo[];
  isNight: boolean;
  myJob: string;
  updateMemo: any;
};

const RightSideContainer: FC<PropType> = ({ players, memoList, isNight, myJob, updateMemo }) => {
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
      <MemoList players={players} memoList={memoList} isNight={isNight} updateMemo={updateMemo} />
      <hr css={hrStyle} />
      {showModal ? (
        <div css={modalWrapperStyle}>
          <Modal />
        </div>
      ) : (
        <></>
      )}
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
