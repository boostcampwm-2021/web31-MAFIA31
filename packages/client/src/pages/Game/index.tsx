/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import ChatContainer from '../../containers/ChatContainer';
import LeftSideContainer from '../../containers/LeftSideContainer';
import useChat from '../../hooks/useChat';
import { User } from '../../../../domain/types/user';

const Game = () => {
  const SOCKET_SERVER_URL = 'localhost:5001/';
  const ROOM_ID = 'hi';
  const { chatList, sendChat } = useChat(ROOM_ID);
  const [userList] = useState([{ userName: 'name1' }, { userName: 'name2' }]);
  const userStateMap = new Map<string, boolean>();
  const [userState] = useState(userStateMap);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { ROOM_ID },
    });

    socketRef.current.on('execution', (user: User) => {
      userList.forEach((u) => {
        if (u.userName === user.userName) {
          userState.set(u.userName, true);
        }
      });
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [ROOM_ID]);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer roomId={ROOM_ID} />
      <ChatContainer chatList={chatList} sendChat={sendChat} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;
  height: 100%;
`;

export default Game;
