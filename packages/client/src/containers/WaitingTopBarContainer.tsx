/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonSizeList, ButtonThemeList, DefaultButton } from '@src/components/Button';
import { FC } from 'react';

interface PropType {
  isHost: boolean;
  sendStart: any;
  sendReady: any;
  isAllReady: any;
  roomName: string;
}

const WaitingTopBarContainer: FC<PropType> = ({
  isHost,
  sendStart,
  sendReady,
  isAllReady,
  roomName,
}) => (
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
);

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

export default WaitingTopBarContainer;
