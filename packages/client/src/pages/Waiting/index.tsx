/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Header from '@src/templates/Header';
import { RoomInfo } from '@src/types';
import { white } from '@src/constants';
import WaitingListContainer from '@src/containers/WaitingListContainer';
import useSocket from '@hooks/useSocket';
import useRoom from '@hooks/useRoom';
import { useUserInfo } from '@src/contexts/userInfo';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@components/Button';

interface locationType {
  roomInfo: RoomInfo;
}

const Waiting = () => {
  const location = useLocation<locationType>();
  const history = useHistory();
  const { roomId } = location.state.roomInfo;
  const { userInfo } = useUserInfo();
  if (!userInfo?.userName) {
    history.push('/');
  }

  const { socketRef } = useSocket(roomId);
  const { waitingUserList, sendReady, sendGameStart } = useRoom(socketRef);
  const isHost =
    waitingUserList.find(({ userName }) => userName === userInfo?.userName)?.isHost ?? false;

  const getReady = () => {
    const me = waitingUserList.find((user) => userInfo?.userName === user.userName);
    if (!me) return;

    sendReady({ userName: me.userName, isReady: !me.isReady, isHost: me.isHost });
  };

  // TODO: socket을 useContext로 관리, 여기서 할당해주기!

  return (
    <>
      <Header />
      <div css={pageStyle}>
        <div css={scrollStyle}>
          <div css={marginStyle}>
            <WaitingListContainer userList={waitingUserList} />
          </div>
        </div>
        <div css={bottomBarStyle}>
          {isHost ? (
            <div css={gameStartStyle(!waitingUserList.some(({ isReady }) => isReady === false))}>
              <Link to="/game">
                <DefaultButton
                  text="START"
                  size={ButtonSizeList.MEDIUM}
                  theme={ButtonThemeList.LIGHT}
                  onClick={sendGameStart}
                />
              </Link>
            </div>
          ) : (
            <DefaultButton
              text="READY"
              size={ButtonSizeList.MEDIUM}
              theme={ButtonThemeList.LIGHT}
              onClick={getReady}
            />
          )}
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
  display: flex;
  width: 100%;
  height: 140px;
  background-color: ${white};
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 70%;
`;

const gameStartStyle = (isAllReady: boolean) =>
  isAllReady
    ? css`
        cursor: pointer;
      `
    : css`
        pointer-events: none;
      `;

export default Waiting;
