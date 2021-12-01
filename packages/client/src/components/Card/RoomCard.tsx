import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomInfo } from '@mafia/domain/types/room';
import { primaryDark, titleActive } from '@src/constants';

interface Prop {
  roomInfo: RoomInfo;
}

const RoomCard: FC<Prop> = ({ roomInfo }) => {
  const { title } = roomInfo;

  return (
    <div css={roomCardStyle}>
      <div css={leftSide}>
        <div className="room-title">{title}</div>
      </div>
      <div css={rightSide} />
    </div>
  );
};

const roomCardStyle = css`
  position: relative;

  padding: 24px;
  width: 450px;
  height: 180px;
  border-radius: 20px;
  color: ${titleActive};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);

  :hover {
    opacity: 0.7;
  }
`;

const leftSide = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 302px;
  height: 100%;

  .room-title {
    font-weight: bold;
    font-size: 24px;
  }

  .room-info {
    display: flex;
    align-items: center;
  }
`;

const rightSide = css`
  position: absolute;
  top: 0;
  right: 0;

  width: 100px;
  height: 180px;
  border-radius: 0 20px 20px 0;
  background-color: ${primaryDark};
`;

export default RoomCard;
