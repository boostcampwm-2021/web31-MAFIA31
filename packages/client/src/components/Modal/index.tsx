import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white } from '@src/constants';
import { JOB_DICT } from '@src/constants/job';
import { RoleCard } from '../Card';
import { SlideLeftIcon, SlideRightIcon } from '../Icon';
import { IconButton, ButtonSizeList, ButtonThemeList } from '../Button';

interface Props {
  show: boolean;
}

export const Modal: FC<Props> = ({ show }) => {
  const startIdx = 1;
  const JOB_PER_PAGE = 3;
  const totalPage = Math.ceil(Object.keys(JOB_DICT).length / JOB_PER_PAGE);
  const [currPage, setCurrPage] = useState(1);
  const currJobList = Object.keys(JOB_DICT).slice(
    (currPage - 1) * JOB_PER_PAGE + startIdx,
    currPage * JOB_PER_PAGE + startIdx,
  );
  const goToPreviousPage = () => {
    setCurrPage((prev) => prev - 1);
  };
  const goToNextPage = () => {
    setCurrPage((prev) => prev + 1);
  };
  const stay = () => {};
  const handleLeftOnClick = () => (currPage > 1 ? goToPreviousPage() : stay());
  const handleRightOnClick = () => (currPage < totalPage ? goToNextPage() : stay());

  return (
    <div css={modalWrapperStyle(show)}>
      <div css={modalContentStyle(JOB_PER_PAGE)}>
        {currJobList.map((job) => (job ? <RoleCard job={job} /> : ''))}
      </div>
      <div css={modalSliderStyle}>
        <IconButton
          css={slideButtonStyle}
          icon={SlideLeftIcon}
          size={ButtonSizeList.SMALL}
          theme={ButtonThemeList.LIGHT}
          onClick={handleLeftOnClick}
        />
        <div>{`${currPage} / ${totalPage}`}</div>
        <IconButton
          css={slideButtonStyle}
          icon={SlideRightIcon}
          size={ButtonSizeList.SMALL}
          theme={ButtonThemeList.LIGHT}
          onClick={handleRightOnClick}
        />
      </div>
    </div>
  );
};

const modalWrapperStyle = (show: boolean) => css`
  display: flex;
  flex-direction: column;
  visibility: ${show ? 'visible' : 'hidden'};
  align-items: center;
  justify-content: center;
  gap: 16px 9px;
  width: 500px;
  padding: 16px;
  background-color: ${white};
  box-shadow: 0px 0px 4px rgba(78, 65, 109, 0.25);
  border-radius: 20px;
`;

const modalContentStyle = (JOB_PER_PAGE: number) => css`
  display: grid;
  grid-template-columns: repeat(${JOB_PER_PAGE}, 1fr);
`;

const modalSliderStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideButtonStyle = css`
  cursor: pointer;
`;
