import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@src/components/Button';

const BUTTON_TEXT = 'Github 로그인';
const BUTTON_SIZE = ButtonSizeList.LARGE;
const BUTTON_THEME = ButtonThemeList.DARK;
const BUTTON_IMAGE_SRC = '/assets/icons/github.png';

const Login: FC = () => (
  <div css={loginPageStyle}>
    <img src="/assets/icons/black-logo.svg" alt="logo" css={logoStyle} />
    <img css={logoImageStyle} src="/assets/images/home.png" alt="home" />
    <a
      href={`https:github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
    >
      <DefaultButton
        text={BUTTON_TEXT}
        size={BUTTON_SIZE}
        theme={BUTTON_THEME}
        imageSrc={BUTTON_IMAGE_SRC}
      />
    </a>
  </div>
);

const loginPageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  padding: 40px;
  height: 100vh;
`;

const logoStyle = css`
  width: 300px;
`;

const logoImageStyle = css`
  height: 45%;
`;

export default Login;
