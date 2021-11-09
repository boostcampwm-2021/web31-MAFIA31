import { useState } from 'react';
import { RoomCard } from '@components/Card';
import { RoomInfo } from '@src/types';

const Rooms = () => {
  const [roomList, setRoomList] = useState<RoomInfo[]>([
    { roomId: '123e4567-e89b-12d3-a456-426614174000', title: '1번째 방', host: 'user1' },
    { roomId: '123e5237-e89b-12d3-a456-426614179560', title: '2번째 방', host: 'user2'},
  ]);

  return roomList.map((room:RoomInfo)=> <RoomCard roomInfo={room}/>
};

export default Rooms;
