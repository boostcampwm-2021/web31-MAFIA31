import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '../../constants';

const Login: FC = () => (
  <div css={containerStyle}>
    <div css={logoTextStyle}>MAFIA 31</div>
    <img css={logoImageStyle} src="/assets/images/home.png" alt="home" />
    <a
      href={`https:github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
    >
      <button css={buttonStyle} type="button">
        <img css={iconImageStyle} src="/assets/icons/github.png" alt="github" /> Github 로그인
      </button>
    </a>
  </div>
);

const logoTextStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 1000;
  font-size: 100px;
  line-height: 145px;
  color: ${primaryDark};
  margin-bottom: 80px;
`;

const logoImageStyle = css`
  width: 400px;
  height: 400px;
  margin-bottom: 80px;
`;

const iconImageStyle = css`
  margin-right: 16px;
`;

const containerStyle = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  background-color: ${primaryDark};
  justify-content: center;
  padding: 12px;
  width: 500px;
  height: 75px;
  border-radius: 15px;
  font-size: 40px;
  color: ${white};
  cursor: pointer;
`;

export default Login;
