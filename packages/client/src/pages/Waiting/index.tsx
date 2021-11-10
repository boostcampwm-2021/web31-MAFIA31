/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, Link } from 'react-router-dom';
import { DefaultButton } from '@components/Button';
import { ButtonSizeList, ButtonThemeList } from '@components/Button/IconButton';
import Header from '@src/templates/Header';
import { WaitingInfo, RoomInfo } from '@src/types';
import useSocket from '@hooks/useSocket';
import { white } from '@src/constants';
import WaitingListContainer from '@src/containers/WaitingListContainer';

interface locationType {
  roomInfo: RoomInfo;
}

const dummyData: WaitingInfo[] = [
  { userName: 'user1', isHost: true, isReady: true },
  { userName: 'user2', isHost: false, isReady: true },
  { userName: 'user3', isHost: false, isReady: false },
  { userName: 'user4', isHost: false, isReady: true },
  { userName: 'user5', isHost: false, isReady: true },
  { userName: 'user6', isHost: false, isReady: false },
  { userName: 'user7', isHost: false, isReady: false },
  { userName: 'user8', isHost: false, isReady: true },
  { userName: 'user9', isHost: false, isReady: true },
  { userName: 'user10', isHost: false, isReady: true },
  { userName: 'user11', isHost: false, isReady: true },
  { userName: 'user12', isHost: false, isReady: false },
];

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
            <WaitingListContainer userList={dummyData} />
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
