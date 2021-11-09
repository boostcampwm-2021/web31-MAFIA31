/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { primaryDark, primaryLight, titleActive, white } from '../../constants';

type themeOptions = {
  [key: string]: SerializedStyles;
};

export enum ButtonSizeList {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum ButtonThemeList {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

interface Props {
  size: ButtonSizeList;
  theme: ButtonThemeList;
  imageSrc: string;
  text: string;
  onClick: () => void;
}

const IconButton = ({ size, theme, imageSrc, text, onClick }: Props) => (
  <button css={buttonStyle(size, theme)} type="button" onClick={onClick}>
    <img src={imageSrc} alt="button" />
    <p>{text}</p>
  </button>
);

const buttonStyle = (size: string, theme: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);
  border-radius: 20px;

  cursor: pointer;

  ${buttonSizeStyle[size]}
  ${buttonThemeStyle[theme]}
`;

const buttonSizeStyle: themeOptions = {
  SMALL: css`
    width: 150px;
    height: 60px;
  `,
  MEDIUM: css`
    width: 300px;
    height: 80px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;
  `,
  LARGE: css`
    width: 500px;
    height: 100px;
  `,
};

const buttonThemeStyle: themeOptions = {
  LIGHT: css`
    color: ${titleActive};
    background-color: ${primaryLight};
  `,
  DARK: css`
    color: ${white};
    background-color: ${primaryDark};
  `,
};

export default IconButton;
