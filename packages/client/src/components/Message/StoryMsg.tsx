import { FC, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';
import { Image, ImageSizeList } from '@components/Image';

interface PropType {
  msg: string;
  imgSrc: string;
}
const StoryMsg: FC<PropType> = ({ msg, imgSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    if (!videoRef.current) return;
    setDisabled(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setTimeout(() => {
      setDisabled(false);
    }, videoRef.current.duration * 1000);
  };

  return (
    <button type="button" css={storyMsgStyle} onClick={handleClick} disabled={disabled}>
      <div css={storyTextStyle}>{msg}</div>
      {imgSrc.includes('.mp4') ? (
        <div css={storyVideoMask}>
          <video css={storyVideoStyle} src={imgSrc} autoPlay ref={videoRef} />
        </div>
      ) : (
        <Image size={ImageSizeList.STORY} src={imgSrc} />
      )}
    </button>
  );
};

const storyVideoMask = css`
  width: 27vw;
  height: 20vh;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${white};
`;

const storyMsgStyle = css`
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

const storyTextStyle = css`
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

const storyVideoStyle = css`
  width: 100%;
  height: 100%;
`;

export default StoryMsg;
