/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Header from '@src/templates/Header';
import { RoomInfo } from '@src/types';
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
    <div css={pageStyle}>
      <Header />
      <div css={pageBodyStyle}>
        <WaitingListContainer userList={waitingUserList} />
        <div css={bottomBarStyle}>
          {isHost ? (
            <div css={gameStartStyle(!waitingUserList.some(({ isReady }) => isReady === false))}>
              <Link to="/game">
                <DefaultButton
                  text="START"
                  size={ButtonSizeList.MEDIUM}
                  theme={ButtonThemeList.DARK}
                  onClick={sendGameStart}
                />
              </Link>
            </div>
          ) : (
            <DefaultButton
              text="READY"
              size={ButtonSizeList.MEDIUM}
              theme={ButtonThemeList.DARK}
              onClick={getReady}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const pageStyle = css`
  height: 100vh;
`;

const pageBodyStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  gap: 40px;
  height: calc(100vh - 100px);
`;

const bottomBarStyle = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
