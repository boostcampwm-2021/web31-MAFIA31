import { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const { search } = useLocation<locationType>();
  const { userInfo } = useUserInfo();
  useSocket(search.replace(/\?/g, ''));
  const { userName: myName } = userInfo!;
  const [isHost, setIsHost] = useState<boolean>();
  const { playerList, sendReady, sendGameStart, isAllReady } = useRoom();

  if (!search.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
    history.goBack();
  }

  const updateHost = () => {
    if (!playerList[0]) {
      setIsHost(false);
      return;
    }
    setIsHost(playerList[0].isHost && myName === playerList[0].userName);
  };

  useEffect(() => {
    updateHost();
  }, [playerList, myName]);

  return (
    <div css={pageStyle}>
      <Header exit />
      <div css={pageBodyStyle}>
        <WaitingListContainer userList={playerList} />
        <div css={bottomBarStyle}>
          {isHost ? (
            <DefaultButton
              text="START"
              size={ButtonSizeList.MEDIUM}
              theme={ButtonThemeList.DARK}
              onClick={sendGameStart}
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

export default Waiting;
