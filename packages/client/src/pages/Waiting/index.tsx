import { useLocation, useHistory } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { RoomInfo } from '@mafia/domain/types/room';
import useSocket from '@hooks/useSocket';
import useRoom from '@hooks/useRoom';
import Header from '@src/templates/Header';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import WaitingList from '@src/lists/WaitingListContainer';

interface locationType {
  roomInfo: RoomInfo;
}
const Waiting = () => {
  const { search } = useLocation<locationType>();
  const history = useHistory();

  if (!search.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
    history.push({ pathname: '/rooms' });
  }

  useSocket(search.replace(/\?/g, ''));
  const { players, isHost, sendReady, sendStart, isAllReady } = useRoom();

  return (
    <div css={pageStyle}>
      <Header exit />
      <div css={pageBodyStyle}>
        <WaitingList userList={players} />
        <div css={bottomBarStyle}>
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
