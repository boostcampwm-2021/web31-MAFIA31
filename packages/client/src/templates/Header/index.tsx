/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@src/components/Button';
import { primaryDark } from '@src/constants';
import { LightLogoIcon } from '@src/components/Icon';

const CREATE_ROOM_BUTTON = '방 만들기';
const MY_PAGE_BUTTON = '마이 페이지';

const Header: FC = () => (
  <header css={headerStyle}>
    <Link to="/rooms">
      <LightLogoIcon />
    </Link>
    <div css={buttonWrapperStyle}>
      <DefaultButton
        text={CREATE_ROOM_BUTTON}
        size={ButtonSizeList.SMALL}
        theme={ButtonThemeList.LIGHT}
      />
      <Link to={{ pathname: '/profile' }}>
        <DefaultButton
          text={MY_PAGE_BUTTON}
          size={ButtonSizeList.SMALL}
          theme={ButtonThemeList.LIGHT}
        />
      </Link>
    </div>
  </header>
);

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;

  padding: 40px;
  height: 100px;
  background-color: ${primaryDark};
`;

const buttonWrapperStyle = css`
  display: flex;
  gap: 24px;
`;

export default Header;
