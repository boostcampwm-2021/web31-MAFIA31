import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';
import { Image, ImageSizeList } from '@components/Image';
import ExecuteAnimation from '@src/animation/ExecureAnimation';

interface PropType {
  msg: string;
  imgSrc: string;
  type: string;
}

const StoryMsg: FC<PropType> = ({ msg, imgSrc, type }) => (
  <div css={StoryMsgStyle}>
    <div css={StoryTextStyle}>{msg}</div>
    {type === 'execution' ? (
      <div css={backgroundStyle}>
        <ExecuteAnimation />
      </div>
    ) : (
      <Image size={ImageSizeList.STORY} src={imgSrc} />
    )}
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

const backgroundStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 167px;
  padding: 16px;
  border-radius: 20px;
  overflow-y: hidden;
  img {
    object-fit: contain;
  }
  background-color: ${white};
`;

export default StoryMsg;
