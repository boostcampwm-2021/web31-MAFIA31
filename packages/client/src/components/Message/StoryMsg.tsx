import { FC, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';
import ExecuteAnimation from '@src/animation/ExecuteAnimation';
import { SEC } from '@mafia/domain/constants/time';
import { Story } from '@src/types';

interface PropType {
  story: Story;
}

const StoryMsg: FC<PropType> = ({ story }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [disabled, setDisabled] = useState(false);
  const { msg, imgSrc, type } = story;

  const handleClick = () => {
    if (!videoRef.current) return;
    setDisabled(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setTimeout(() => {
      setDisabled(false);
    }, videoRef.current.duration * SEC);
  };

  return (
    <button type="button" css={storyMsgStyle} onClick={handleClick} disabled={disabled}>
      <p css={storyTextStyle}>{msg}</p>
      <div css={storyAnimationStyle}>
        {type === 'css animation' ? (
          <ExecuteAnimation />
        ) : type === 'mp4 animation' ? (
          <video css={storyVideoStyle} src={imgSrc} autoPlay ref={videoRef} />
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

const storyMsgStyle = css`
  display: flex;
  flex-direction: column;
  align-self: center;

  gap: 16px;
  padding: 30px 60px;
  width: 70%;
  max-width: 500px;
  background: ${primaryDark};
  border-radius: 20px;
`;

const storyTextStyle = css`
  font-weight: bold;
  text-align: center;
  width: 100%;
  font-size: 20px;
  color: ${white};
`;

const storyAnimationStyle = css`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${white};
`;

const storyVideoStyle = css`
  object-fit: scale-down;
  width: 100%;
`;

export default StoryMsg;
