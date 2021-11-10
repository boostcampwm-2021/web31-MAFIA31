import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Achievement } from 'domain/types/achievement';
import { Image, ImageSizeList } from '../Image';

const AchievementCard: FC<Achievement> = ({ title, imgSrc, isAccomplished }) => (
  <div css={achievementCardStyle}>
    <Image size={ImageSizeList.SMALL_MEDIUM} src={imgSrc} css={imageStyle(isAccomplished)} />
    <div>{title}</div>
  </div>
);
const achievementCardStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;
`;

const imageStyle = (isAccomplished: boolean) => css`
  opacity: ${isAccomplished ? '50%' : '100%'};
`;

export default AchievementCard;
