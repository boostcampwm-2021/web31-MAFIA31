import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Achievement } from '@mafia/domain/types/achievement';
import { white } from '@constants/colors';
import { Image, ImageSizeList } from '../Image';

const AchievementCard: FC<Achievement> = ({ title, imgSrc, isAccomplished, description }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <>
      <div
        css={achievementCardStyle}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseOut={() => setIsMouseOver(false)}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <Image size={ImageSizeList.MEDIUM} src={imgSrc} css={imageStyle(isAccomplished)} />
        <div>{title}</div>
        <p css={descriptionStyle(isMouseOver)}>{description}</p>
      </div>
    </>
  );
};
const achievementCardStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;

  gap: 8px;
  font-size: 20px;
`;

const imageStyle = (isAccomplished: boolean) => css`
  position: relative;
  opacity: ${isAccomplished ? '50%' : '100%'};
`;

const descriptionStyle = (isMouseOver: boolean) => css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${isMouseOver ? 0 : -1};
  color: ${white};
  background-color: rgba(0, 0, 0, 0.7);
  width: 120px;
  height: 120px;
  border-radius: 15px;
`;

export default AchievementCard;
