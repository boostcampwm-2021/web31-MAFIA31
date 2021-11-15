/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { white } from '@src/constants';

type themeOptions = {
  [key: string]: SerializedStyles;
};

// eslint-disable-next-line no-shadow
export enum ImageSizeList {
  SMALL = 'SMALL',
  SMALL_MEDIUM = 'SMALL_MEDIUM',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum ImageTypeList {
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
}

interface Props {
  size: ImageSizeList;
  type?: ImageTypeList;
  src: string;
}

export const Image = ({ size, type = ImageTypeList.RECTANGLE, src }: Props) => (
  <div css={[imageStyle, imageSizeStyle[size], imageTypeStyle[type]]}>
    <img src={src} alt="" />
  </div>
);

const imageStyle = css`
  background-color: ${white};
  box-shadow: 2px 2px 10px rgba(78, 65, 109, 0.25);

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
  SMALL_MEDIUM: css`
    width: 100px;
    height: 100px;
    padding: 8px;
  `,
  MEDIUM: css`
    width: 120px;
    height: 120px;
    padding: 8px;
  `,
  LARGE: css`
    width: 250px;
    height: 250px;
    padding: 20px;
  `,
};

const imageTypeStyle: themeOptions = {
  RECTANGLE: css`
    border-radius: 15px;
    img {
      border-radius: 15px;
    }
  `,
  CIRCLE: css`
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
  `,
};
