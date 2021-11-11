/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { titleActive, white } from '@constants/colors';
import { ButtonSizeList, ButtonThemeList } from './Button.st';

type themeOptions = {
  [key: string]: SerializedStyles;
};

interface Props {
  icon: any;
  size: ButtonSizeList;
  theme: ButtonThemeList;
  onClick: () => void;
}

const IconButton = ({ icon: Icon, size, theme, onClick }: Props) => (
  <button css={buttonStyle(size, theme)} type="button" onClick={onClick}>
    <Icon />
  </button>
);

const buttonStyle = (size: string, theme: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;

  ${buttonSizeStyle[size]}
  ${buttonThemeStyle[theme]}
`;

const buttonSizeStyle: themeOptions = {
  SMALL: css`
    width: 25px;
    height: 25px;
  `,
  MEDIUM: css`
    width: 32px;
    height: 32px;
  `,
  LARGE: css`
    width: 40px;
    height: 40px;
  `,
};

const buttonThemeStyle: themeOptions = {
  LIGHT: css`
    svg path {
      fill: ${white};
    }
  `,
  DARK: css`
    svg path {
      fill: ${titleActive};
    }
  `,
};

export default IconButton;
