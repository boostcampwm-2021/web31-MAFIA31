import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RoomInfo } from '@src/types';
import { primaryDark, white } from '@src/constants';

interface Prop {
  roomInfo: RoomInfo;
}

const RoomCard: FC<Prop> = ({ roomInfo }) => {
  const { title } = roomInfo;
  const userCount: number = 3;

  return (
    <section css={roomCardStyle}>
      <div css={leftSide}>
        <div className="room__title">{title}</div>
        <div>
          <span className="room__user-count">{`${userCount} / 12`}</span>
        </div>
      </div>
      <div css={rightSide}>
        <img src="/assets/icons/person.svg" alt="person" />
        <span className="room__user-count">{`${userCount} / 12`}</span>
      </div>
    </section>
  );
};

const roomCardStyle = css`
  display: flex;

  max-width: 565px;
  height: 220px;
  border-radius: 20px;
  color: ${primaryDark};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);

  :hover {
    opacity: 0.8;
  }

  .room__user-count {
    font-weight: 500;
    font-size: 16px;
  }
`;

const leftSide = css`
  padding: 24px;
  width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .room__title {
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
  }
`;

const rightSide = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 125px;
  color: ${white};
  background-color: ${primaryDark};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export default RoomCard;
