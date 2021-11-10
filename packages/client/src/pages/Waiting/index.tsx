import { useLocation, Link } from 'react-router-dom';
import { DefaultButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import Header from '@src/templates/Header';
import { RoomInfo } from '@src/types';
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
    <>
      <Header />
      <Link to="/game">
        <DefaultButton text="READY" size={ButtonSizeList.MEDIUM} theme={ButtonThemeList.LIGHT} />
      </Link>
    </>
  );
};

export default Waiting;
