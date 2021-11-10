/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { white } from '@constants/index';

type themeOptions = {
  [key: string]: SerializedStyles;
};

// eslint-disable-next-line no-shadow
export enum ImageSizeList {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

interface Props {
  size: ImageSizeList;
  src: string;
}

export const Image = ({ size, src }: Props) => (
  <div css={[imageStyle, imageSizeStyle[size]]}>
    <img src={src} alt="" />
  </div>
);

const imageStyle = css`
  background-color: ${white};
  box-shadow: 2px 2px 10px rgba(78, 65, 109, 0.25);
  border-radius: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const imageSizeStyle: themeOptions = {
  SMALL: css`
    width: 80px;
    height: 80px;
    padding: 7px;
  `,
  MEDIUM: css`
    width: 120px;
    height: 120px;
    padding: 8px;
  `,
  LARGE: css`
    width: 300px;
    height: 300px;
    padding: 20px;
  `,
};
