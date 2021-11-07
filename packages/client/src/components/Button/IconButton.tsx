/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';

type themeOptions = {
  [key: string]: SerializedStyles;
};

// eslint-disable-next-line no-shadow
export enum ButtonSizeList {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

interface Props {
  size: ButtonSizeList;
  color: string;
  imageSrc: string;
  text: string;
  onClick: () => void;
}

const IconButton = ({ size, color, imageSrc, text, onClick }: Props) => (
  <button css={buttonStyle(size, color)} type="button" onClick={onClick}>
    <img src={imageSrc} alt="button" />
    <p>{text}</p>
  </button>
);

const buttonStyle = (size: string, color: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${color};
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);
  border-radius: 20px;

  ${buttonSizeStyle[size]}
`;

const buttonSizeStyle: themeOptions = {
  SMALL: css`
    width: 150px;
    height: 60px;
  `,
  MEDIUM: css`
    width: 300px;
    height: 80px;
  `,
  LARGE: css`
    width: 500px;
    height: 100px;
  `,
};

export default IconButton;
