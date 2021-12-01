/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '@src/templates/Header';

const NOT_FOUND_DESC = '페이지를 찾을 수 없습니다. 페이지 주소가 정확한지 확인해주세요';
const NOT_FOUND_ERROR = '404 Not Found';

const NotFound = () => (
  <div>
    <Header />
    <div css={ErrorStyle}>
      <img css={ErrorImageStyle} src="/assets/images/not-found.png" alt={NOT_FOUND_ERROR} />
      <div css={ErrorTextStyle}>
        <div css={ErrorMessageStyle}>{NOT_FOUND_ERROR}</div>
        <div>{NOT_FOUND_DESC}</div>
      </div>
    </div>
  </div>
);

const ErrorStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
`;

const ErrorImageStyle = css`
  width: 1000px;
  height: 450px;
  margin-top: 10px;
`;

const ErrorTextStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  text-align: center;
`;

const ErrorMessageStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 45px;
  line-height: 46px;
`;

export default NotFound;
