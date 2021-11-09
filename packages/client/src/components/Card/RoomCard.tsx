import { FC } from 'react';
import { Link } from 'react-router-dom';
import { RoomInfo } from '@src/types';

interface Prop {
  roomInfo: RoomInfo;
}

const RoomCard: FC<Prop> = ({ roomInfo }) => {
  const { roomId, title, host } = roomInfo;

  return (
    <Link to={{ pathname: '/waiting', state: { roomInfo } }}>
      <div>{roomId}</div>
      <div>{title}</div>
      <div>{host}</div>
    </Link>
  );
};

export default RoomCard;
