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
import { withCondition } from '@src/hoc';

const CREATE_ROOM_BUTTON = '방 만들기';
const EXIT_ROOM_BUTTON = '나가기';
const MY_PAGE_BUTTON = '마이 페이지';

interface Props {
  createRoom?: boolean;
  exit?: boolean;
  profilePage?: boolean;
  skeleton?: boolean;
}

const DefaultButtonCondition = withCondition(DefaultButton);
const LinkDefaultButtonCondition = withCondition(Link);
const SkeletonDefaultButtonCondition = withCondition(SkeletonDefaultButton);

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
        <DefaultButtonCondition
          condition={createRoom}
          text={CREATE_ROOM_BUTTON}
          size={ButtonSizeList.SMALL}
          theme={ButtonThemeList.LIGHT}
          onClick={openModal}
        />
        <DefaultButtonCondition
          condition={exit}
          text={EXIT_ROOM_BUTTON}
          size={ButtonSizeList.SMALL}
          theme={ButtonThemeList.LIGHT}
          onClick={goRooms}
        />
        <LinkDefaultButtonCondition condition={profilePage} to={{ pathname: '/profile' }}>
          <DefaultButton
            text={MY_PAGE_BUTTON}
            size={ButtonSizeList.SMALL}
            theme={ButtonThemeList.LIGHT}
          />
        </LinkDefaultButtonCondition>
        <SkeletonDefaultButtonCondition condition={skeleton} size={ButtonSizeList.SMALL} />
        <SkeletonDefaultButtonCondition condition={skeleton} size={ButtonSizeList.SMALL} />
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
