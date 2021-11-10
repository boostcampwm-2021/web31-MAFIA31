import { RoomCard } from '@src/components/Card';
import { RoomInfo } from '@src/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RoomContainer = () => {
  const [roomList] = useState<RoomInfo[]>([
    { roomId: '123e4567-e89b-12d3-a456-426614174000', title: '1번째 방', host: 'user1' },
    { roomId: '123e5237-e89b-12d3-a456-426614179560', title: '2번째 방', host: 'user2' },
  ]);

  return (
    <div>
      {roomList.map((roomInfo) => (
        <Link to={{ pathname: '/waiting', state: { roomInfo } }} key={roomInfo.roomId}>
          <RoomCard roomInfo={roomInfo} />
        </Link>
      ))}
    </div>
  );
};

export default RoomContainer;
