import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';

interface PropType {
  msg: string;
  imgSrc: string;
}

const StoryMsg: FC<PropType> = ({ msg, imgSrc }) => (
  <div css={StoryMsgStyle}>
    <div css={StoryTextStyle}>{msg}</div>
    <img src={imgSrc} alt="story" css={StoryImgStyle} />
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

  background: ${primaryDark};
  border-radius: 20px;
`;

const StoryTextStyle = css`
  padding-bottom: 16px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  text-align: center;

  color: ${white};
`;

const StoryImgStyle = css`
  width: 100%;
  padding: 16px;
  background: ${white};
  border-radius: 20px;
`;
export default StoryMsg;
