/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { primaryDark } from '../../constants/index';
import ChatContainer from '../../containers/ChatContainer';
import LeftSideContainer from '../../containers/LeftSideContainer';
import RightSideContainer from '../../containers/RightSideContainer';
import useSocket from '../../hooks/useSocket';
import useChat from '../../hooks/useChat';
import useExecute from '../../hooks/useExecute';
import { Socket } from 'socket.io-client';

const Game = ({ socket }: { socket: Socket }) => {
  const myName = useRef(uuidv4());
  const ROOM_ID = 'hi';
  const dummyUUID = '123e4567-e89b-12d3-a456-426614174000';
  const { chatList, sendChat } = useChat(socket);
  const playerStateList = useExecute(ROOM_ID);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer roomId={ROOM_ID} playerStateList={playerStateList} />
      <ChatContainer chatList={chatList} sendChat={sendChat} myName={myName.current} />
      <RightSideContainer playerStateList={playerStateList} />
    </div>
  );
};

const GamePageStyle = css`
  display: flex;

  height: 100vh;
  background-color: ${primaryDark};
`;

export default Game;
