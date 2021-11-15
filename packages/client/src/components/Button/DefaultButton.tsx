import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  primaryDarkHover,
  primaryLightHover,
  primaryLightDisable,
  primaryDarkDisable,
  primaryDark,
  primaryLight,
  titleActive,
  white,
} from '@src/constants';
import { ButtonSizeList, ButtonThemeList } from './Button.st';

interface Props {
  text: string;
  size: ButtonSizeList;
  theme: ButtonThemeList;
  imageSrc?: string;
  onClick?: any;
  isDisabled?: boolean;
}

const DefaultButton: FC<Props> = ({ text, size, theme, imageSrc, onClick, isDisabled = false }) => (
  <button
    type="button"
    onClick={() => onClick!()}
    css={buttonStyle(size, theme)}
    disabled={isDisabled}
  >
    {imageSrc ? <img src={imageSrc} alt="button" css={imageStyle} /> : ''}
    <p>{text}</p>
  </button>
);

DefaultButton.defaultProps = {
  onClick: () => {},
};

const buttonStyle = (size: ButtonSizeList, theme: ButtonThemeList) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;

  gap: 15px;
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);

  :disabled {
    cursor: default;
  }

  ${buttonSizeStyle[size]}
  ${buttonThemeStyle[theme]}
`;

const buttonSizeStyle = {
  SMALL: css`
    width: 150px;
    height: 60px;
    border-radius: 10px;
    font-size: 24px;
    line-height: 35px;
  `,
  MEDIUM: css`
    width: 300px;
    height: 80px;
    border-radius: 20px;
    font-size: 32px;
    line-height: 46px;
  `,
  LARGE: css`
    width: 500px;
    height: 100px;
    border-radius: 20px;
    font-size: 40px;
    line-height: 58px;
  `,
};

const buttonThemeStyle = {
  LIGHT: css`
    color: ${titleActive};
    background-color: ${primaryLight};

    :disabled {
      background-color: ${primaryLightDisable};
    }
    :hover:not([disabled]) {
      background-color: ${primaryLightHover};
    }
  `,
  DARK: css`
    color: ${white};
    background-color: ${primaryDark};

    :disabled {
      background-color: ${primaryDarkDisable};
    }
    :hover:not([disabled]) {
      background-color: ${primaryDarkHover};
    }
  `,
};

const imageStyle = css`
  width: 40px;
  height: 40px;
`;

export default DefaultButton;
