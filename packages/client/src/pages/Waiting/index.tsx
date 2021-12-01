/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Header from '@src/templates/Header';
import WaitingListContainer from '@src/containers/WaitingListContainer';

const Waiting = () => (
  <div css={pageStyle}>
    <Header exit />
    <WaitingListContainer />
  </div>
);
const pageStyle = css`
  height: 100vh;
`;

export default Waiting;
