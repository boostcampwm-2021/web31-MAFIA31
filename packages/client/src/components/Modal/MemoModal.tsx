import React, { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { JOB_ARR } from '@constants/index';
import { Image, ImageSizeList } from '@components/Image';
import CustomModal from './CustomModal';

type PropType = {
  userName: string;
  isOpen: boolean;
  eventHandler: any;
  onRequestClose: () => void;
};

const MemoModal: FC<PropType> = ({ userName, isOpen, onRequestClose, eventHandler }) => {
  const memoButtonHandler = ({ currentTarget }: React.MouseEvent) => {
    const job = currentTarget.getAttribute('data-job');
    eventHandler(userName, job);
    onRequestClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Memo Modal"
      style={modalStyle}
    >
      <div css={memoContainerStyle}>
        {JOB_ARR.map(({ job, jobKr, image }) => (
          <button
            type="button"
            key={job}
            css={memoButtonStyle}
            onClick={memoButtonHandler}
            data-job={job}
          >
            <Image size={ImageSizeList.SMALL} src={image} />
            <span>{jobKr}</span>
          </button>
        ))}
      </div>
    </CustomModal>
  );
};

const modalStyle = {
  content: {
    width: '230px',
    right: '23%',
    left: 'auto',
    padding: '0',
    border: '0',
    boxShadow: '0px 0px 4px rgba(78, 65, 109, 0.25)',
    transform: 'translate(0, -50%)',
  },

  overlay: {
    backgroundColor: 'transparent',
  },
};

const memoContainerStyle = css`
  display: flex;
  flex-wrap: wrap;

  gap: 10px;
  padding: 16px;
`;

const memoButtonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  gap: 10px;
  background-color: transparent;
`;

export default MemoModal;
