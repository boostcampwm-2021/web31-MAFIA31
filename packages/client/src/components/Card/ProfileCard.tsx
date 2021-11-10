import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryDark, primaryLight, white } from '@src/constants';

interface Prop {
  userName: string;
  profileImg: string;
  status: string;
  fill: boolean;
}

const ProfileCard: FC<Prop> = ({ userName, profileImg, status, fill }) => (
  <div css={cardStyle}>
    <div css={textStyle}>{userName}</div>
    <div css={imgWrapperStyle}>
      <img css={imgStyle} src={profileImg} alt="profileImg" />
    </div>
    <div css={statusStyle(fill)}>{status}</div>
  </div>
);

const cardStyle = css`
  width: 200px;
  height: 220px;
  border-radius: 15px;
  box-shadow: 4px 4px 4px rgba(78, 65, 109, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const imgWrapperStyle = css`
  background-color: ${primaryLight};
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const imgStyle = css`
  width: 100px;
  height: 100px;
`;

const textStyle = css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
`;

const statusStyle = (fill: boolean) => css`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  ${fillStyle(fill)}
`;

const fillStyle = (fill: boolean) =>
  css`
    color: ${fill ? primaryDark : white};
    text-shadow: ${fill ? `1px 1px` : `2px 2px`} 2px ${primaryDark};
  `;

export default ProfileCard;
