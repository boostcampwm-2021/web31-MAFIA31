/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, Link } from 'react-router-dom';
import { DefaultButton } from '@components/Button';
import { ButtonSizeList, ButtonThemeList } from '@components/Button/IconButton';
import Header from '@src/templates/Header';
import { RoomInfo } from '@src/types';
import useSocket from '@hooks/useSocket';
import { User } from 'domain/types/user';
import ProfileContainer from '@src/containers/ProfileContainer';
import { white } from '@src/constants';

interface locationType {
  roomInfo: RoomInfo;
}
const dummyData: User[] = [
  { userName: 'user1' },
  { userName: 'user2' },
  { userName: 'user3' },
  { userName: 'user4' },
  { userName: 'user5' },
  { userName: 'user6' },
  { userName: 'user7' },
  { userName: 'user8' },
  { userName: 'user9' },
  { userName: 'user10' },
  { userName: 'user11' },
  { userName: 'user12' },
];
const host = 'user1';
const Waiting = () => {
  const location = useLocation<locationType>();
  const { roomId } = location.state.roomInfo;
  const { socketRef } = useSocket(roomId);
  console.log(socketRef); // TODO: socket을 useContext로 관리, 여기서 할당해주기!

  return (
    <>
      <Header />
      <div css={pageStyle}>
        <div css={scrollStyle}>
          <div css={marginStyle}>
            <ProfileContainer userList={dummyData} host={host} />
          </div>
        </div>
        <div css={bottomBarStyle}>
          <Link to="/game">
            <DefaultButton
              text="READY"
              size={ButtonSizeList.MEDIUM}
              theme={ButtonThemeList.LIGHT}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

const pageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const scrollStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 600px;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const marginStyle = css`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const bottomBarStyle = css`
  width: 100%;
  height: 140px;
  background-color: ${white};
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 70%;
`;

export default Waiting;
