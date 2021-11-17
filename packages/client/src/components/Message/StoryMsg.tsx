import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';
import { Image, ImageSizeList } from '@components/Image';

interface PropType {
  msg: string;
  imgSrc: string;
}

const StoryMsg: FC<PropType> = ({ msg, imgSrc }) => (
  <div css={StoryMsgStyle}>
    <div css={StoryTextStyle}>{msg}</div>
    <Image size={ImageSizeList.STORY} src={imgSrc} />
  </div>
);

const StoryMsgStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 33px 60px;
  width: 80%;
  min-width: 342px;
  background: ${primaryDark};
  border-radius: 20px;
`;

const StoryTextStyle = css`
  padding-bottom: 16px;
  min-width: 342px;
  padding: 33px;
  font-family: Noto Sans KR;
  background: ${primaryDark};
  color: ${white};
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  border-radius: 20px;
`;

export default StoryMsg;
