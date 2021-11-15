import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Image, ImageSizeList, ImageTypeList } from '@components/Image';
import { primaryDark, white } from '@src/constants';

interface Prop {
  userName: string;
  profileImg: string;
  status: string;
  fill: boolean;
}

const ProfileCard: FC<Prop> = ({ userName, profileImg, status, fill }) => (
  <div css={cardStyle}>
    <div css={textStyle}>{userName}</div>
    <Image size={ImageSizeList.SMALL_MEDIUM} type={ImageTypeList.CIRCLE} src={profileImg} />
    <div css={statusStyle(fill)}>{status}</div>
  </div>
);

const cardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;
  width: 200px;
  height: 220px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
`;

const textStyle = css`
  font-weight: 500;
  font-size: 16px;
`;

const statusStyle = (fill: boolean) => css`
  font-weight: bold;
  font-size: 24px;
  ${fillStyle(fill)}
`;

const fillStyle = (fill: boolean) =>
  css`
    color: ${fill ? primaryDark : white};
    text-shadow: -1px -1px 0 ${fill ? white : primaryDark}, 1px 1px 0 ${fill ? white : primaryDark},
      -1px 1px 0 ${fill ? white : primaryDark}, 1px 1px 0 ${fill ? white : primaryDark};
  `;

export default ProfileCard;
