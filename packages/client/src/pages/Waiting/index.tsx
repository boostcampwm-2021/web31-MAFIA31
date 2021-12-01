import { useState, useLayoutEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { RoomInfo } from '@mafia/domain/types/room';
import useSocket from '@hooks/useSocket';
import useRoom from '@hooks/useRoom';
import Header from '@src/templates/Header';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import WaitingList from '@src/lists/WaitingListContainer';
import apiClient from '@src/axios/apiClient';

interface locationType {
  roomInfo: RoomInfo;
}
const Waiting = () => {
  const { search } = useLocation<locationType>();
  const [roomName, setRoomName] = useState('');
  const history = useHistory();
  const roomId = search.replace(/\?/g, '');
  if (!roomId.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
    history.push({ pathname: '/rooms' });
  }

  const getRoomInfo = async () => {
    const { data } = await apiClient.get(`/rooms/${roomId}`);
    setRoomName(data.title);
  };

  useLayoutEffect(() => {
    getRoomInfo();
  }, []);

  useSocket(roomId);
  const { players, isHost, sendReady, sendStart, isAllReady } = useRoom();

  return (
    <div css={pageStyle}>
      <Header exit />
      <div css={pageBodyStyle}>
        <div css={bottomBarStyle}>
          <div css={pageTitleStyle}>
            {roomName} <img css={iconMarginStyle} src="/assets/icons/link.png" alt="link" />
          </div>
          <div>
            {isHost ? (
              <DefaultButton
                text="START"
                size={ButtonSizeList.MEDIUM}
                theme={ButtonThemeList.DARK}
                onClick={sendStart}
                isDisabled={!isAllReady()}
              />
            ) : (
              <DefaultButton
                text="READY"
                size={ButtonSizeList.MEDIUM}
                theme={ButtonThemeList.DARK}
                onClick={sendReady}
              />
            )}
          </div>
        </div>
        <WaitingList userList={players} />
      </div>
    </div>
  );
};

const pageStyle = css`
  height: 100vh;
`;

const pageTitleStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;
  display: flex;
  align-items: center;
  text-align: center;
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
  justify-content: space-between;
  width: 50vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
`;

const iconMarginStyle = css`
  margin-left: 15px;
  margin-right: 15px;
`;
export default Waiting;
