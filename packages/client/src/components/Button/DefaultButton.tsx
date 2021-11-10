/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import { ButtonSizeList, ButtonThemeList } from '.';

interface Props {
  text: string;
  size: ButtonSizeList;
  theme: ButtonThemeList;
  imageSrc?: string;
}
const DefaultButton = ({ text, size, theme, imageSrc }: Props) => (
  <button type="button" css={buttonStyle(size, theme)}>
    {imageSrc ? <img src={imageSrc} alt="button" /> : ''}
    <p>{text}</p>
  </button>
);

const buttonStyle = (size: ButtonSizeList, theme: ButtonThemeList) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 15px;
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);
  cursor: pointer;

  ${buttonSizeStyle[size]}
  ${buttonThemeStyle[theme]}
`;

const buttonSizeStyle = {
  SMALL: css`
    width: 150px;
    height: 60px;
    border-radius: 10px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
  `,
  MEDIUM: css`
    width: 300px;
    height: 80px;
    border-radius: 20px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;
  `,
  LARGE: css`
    width: 500px;
    height: 100px;
    border-radius: 20px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 58px;
  `,
};

const buttonThemeStyle = {
  LIGHT: css`
    color: ${white};
    background-color: ${primaryDark};
  `,
  DARK: css`
    color: ${titleActive};
    background-color: ${primaryLight};
  `,
};

export default DefaultButton;
