import { useLocation, Link } from 'react-router-dom';

import { RoomInfo } from '@src/types';
import { DefaultButton } from '@components/Button';
import useSocket from '@hooks/useSocket';

interface locationType {
  roomInfo: RoomInfo;
}

const Waiting = () => {
  const location = useLocation<locationType>();
  const { roomId } = location.state.roomInfo;
  const { socketRef } = useSocket(roomId);
  console.log(socketRef); // TODO: socket을 useContext로 관리, 여기서 할당해주기!

  return (
    <Link to="/game">
      <DefaultButton />
    </Link>
  );
};

export default Waiting;
