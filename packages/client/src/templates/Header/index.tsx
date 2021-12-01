/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@src/components/Button';
import { primaryDark } from '@src/constants';
import { LightLogoIcon } from '@src/components/Icon';
import useModal from '@src/hooks/useModal';
import NoticeModal from '@src/components/Modal/NoticeModal';
import RoomFormContainer from '@src/containers/RoomFormContainer';
import SkeletonDefaultButton from '@src/components/Skeleton/SkeletonDefaultButton';

const CREATE_ROOM_BUTTON = '방 만들기';
const EXIT_ROOM_BUTTON = '나가기';
const MY_PAGE_BUTTON = '마이 페이지';

interface Props {
  createRoom?: boolean;
  exit?: boolean;
  profilePage?: boolean;
  skeleton?: boolean;
}

const Header: FC<Props> = ({
  createRoom = false,
  exit = false,
  profilePage = false,
  skeleton = false,
}) => {
  const history = useHistory();
  const { isModalOpen, openModal, closeModal } = useModal();
  const goRooms = () => {
    history.push('/rooms');
  };

  return (
    <header css={headerStyle}>
      <NoticeModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <RoomFormContainer />
      </NoticeModal>
      <Link to="/rooms">
        <LightLogoIcon />
      </Link>
      <div css={buttonWrapperStyle}>
        {createRoom ? (
          <DefaultButton
            text={CREATE_ROOM_BUTTON}
            size={ButtonSizeList.SMALL}
            theme={ButtonThemeList.LIGHT}
            onClick={openModal}
          />
        ) : (
          <></>
        )}
        {exit ? (
          <DefaultButton
            text={EXIT_ROOM_BUTTON}
            size={ButtonSizeList.SMALL}
            theme={ButtonThemeList.LIGHT}
            onClick={goRooms}
          />
        ) : (
          <></>
        )}
        {profilePage ? (
          <Link to={{ pathname: '/profile' }}>
            <DefaultButton
              text={MY_PAGE_BUTTON}
              size={ButtonSizeList.SMALL}
              theme={ButtonThemeList.LIGHT}
            />
          </Link>
        ) : (
          <></>
        )}
        {skeleton ? (
          <>
            <SkeletonDefaultButton size={ButtonSizeList.SMALL} />
            <SkeletonDefaultButton size={ButtonSizeList.SMALL} />
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

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
