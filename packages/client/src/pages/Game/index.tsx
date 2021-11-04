/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
// import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import ChatContainer from '../../containers/ChatContainer';
import LeftSideContainer from '../../containers/LeftSideContainer';
import useChat from '../../hooks/useChat';
// import { User } from '../../../../domain/types/user';

const Game = () => {
  const myName = useRef(uuidv4());
  const ROOM_ID = 'hi';
  const { chatList, sendChat } = useChat(ROOM_ID);
  // const [userList, setUserList] = useState([myName]);

  // useEffect(() => {
  //   myName =;
  //   console.log(myName);
  // }, []);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer roomId={ROOM_ID} />
      <ChatContainer chatList={chatList} sendChat={sendChat} myName={myName.current} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;
  height: 100%;
`;

export default Game;
