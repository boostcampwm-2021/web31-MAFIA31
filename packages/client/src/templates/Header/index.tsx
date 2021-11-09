/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, white } from '@src/constants';

const Header = () => (
  <div css={headerStyle}>
    <div css={logoStyle}>MAFIA 31</div>
  </div>
);

const headerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: ${primaryDark};
`;

const logoStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 72px;
  color: ${white};
  margin-left: 40px;
`;

export default Header;
