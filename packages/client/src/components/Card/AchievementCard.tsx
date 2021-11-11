import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Achievement } from '@mafia/domain/types/achievement';
import { grey1 } from '@src/constants/colors';
import { Image, ImageSizeList } from '../Image';

const AchievementCard: FC<Achievement> = ({ title, imgSrc, isAccomplished, description }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div
      css={achievementCardStyle}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      <div css={imageWrapperStyle}>
        <Image size={ImageSizeList.SMALL_MEDIUM} src={imgSrc} css={imageStyle(isAccomplished)} />
        <p css={descriptionStyle(isMouseOver)}>{description}</p>
      </div>
      <div>{title}</div>
    </div>
  );
};
const achievementCardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;

  width: fit-content;
  height: fit-content;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
`;
const imageWrapperStyle = css`
  position: relative;
`;

const imageStyle = (isAccomplished: boolean) => css`
  position: relative;
  z-index: 0;
  opacity: ${isAccomplished ? '50%' : '100%'};
`;

const descriptionStyle = (isMouseOver: boolean) => css`
  position: absolute;
  z-index: ${isMouseOver ? 1 : -1};
  background-color: ${grey1};
  width: 120px;
  height: 120px;
  text-align: center;
  border-radius: 20px;
`;

export default AchievementCard;
