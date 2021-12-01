/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ButtonSizeList, ButtonThemeList, DefaultButton } from '@src/components/Button';
import { FC } from 'react';

interface PropType {
  isHost: boolean;
  sendStart: any;
  sendReady: any;
  isAllReady: any;
}

const WaitingBottomBarContainer: FC<PropType> = ({ isHost, sendStart, sendReady, isAllReady }) => (
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
);

const bottomBarStyle = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export default WaitingBottomBarContainer;
