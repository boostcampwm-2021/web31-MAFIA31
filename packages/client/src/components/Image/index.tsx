/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';

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

export const Image = ({ size, src }: Props) => <img css={imageStyle(size)} src={src} alt="" />;

const imageStyle = (size: string) => css`
  box-shadow: 2px 2px 10px rgba(78, 65, 109, 0.25);
  border-radius: 15px;
  ${imageSizeStyle[size]}
`;

const imageSizeStyle: themeOptions = {
  SMALL: css`
    width: 80px;
    height: 80px; ;
  `,
  MEDIUM: css`
    width: 180px;
    height: 180px;
  `,
  LARGE: css`
    width: 300px;
    height: 300px;
  `,
};
