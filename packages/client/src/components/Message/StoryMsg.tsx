import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark } from '@src/constants';

interface PropType {
  msg: string;
  imgSrc: string;
}

const StoryMsg: FC<PropType> = ({ msg, imgSrc }) => (
  <div css={StoryMsgStyle}>
    <div>{msg}</div>
    <img src={imgSrc} alt="story" />
  </div>
);

const StoryMsgStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 33px 60px;

  width: 494px;
  height: 325px;

  background: ${primaryDark};
  border-radius: 20px;
`;

export default StoryMsg;
