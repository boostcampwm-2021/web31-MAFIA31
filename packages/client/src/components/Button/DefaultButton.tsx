import { FC } from 'react';
import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import { primaryDark, primaryLight, titleActive, white } from '@src/constants';
import { ButtonSizeList, ButtonThemeList } from './IconButton';

interface Props {
  text: string;
  size: ButtonSizeList;
  theme: ButtonThemeList;
  onClick?: any;
}

const DefaultButton: FC<Props> = ({ text, size, theme, onClick }: Props) => (
  <button type="button" onClick={() => onClick!()} css={buttonStyle(size, theme)}>
    {text}
  </button>
);

DefaultButton.defaultProps = {
  onClick: () => {},
};

const buttonStyle = (size: ButtonSizeList, theme: ButtonThemeList) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);

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
