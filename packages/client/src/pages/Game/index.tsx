/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import useSocket from '@hooks/useSocket';
import useExecute from '@hooks/useExecute';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@src/hooks/useAbility';
import { primaryDark } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';
import { useEffect, useState } from 'react';
import { TURN_CHANGE } from 'domain/constants/event';

const Game = () => {
  const myUserName = 'user1';
  const [isNight, setIsNight] = useState(false);
  const { socketRef, socketId } = useSocket('123e4567-e89b-12d3-a456-426614174000');
  const playerStateList = useExecute(socketRef);
  const { chatList, sendChat } = useChat(socketRef);
  const { playerList, voteUser } = useVote(socketRef, myUserName);
  const { emitAbility, mafiaPickList } = useAbility(socketRef, socketId!, 'user1', 'mafia');

  useEffect(() => {
    socketRef.current?.on(TURN_CHANGE, (isNight) => {
      setIsNight(isNight);
    });

    return () => {
      socketRef.current?.off(TURN_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div css={GamePageStyle}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={playerList}
        myUserName={myUserName}
        voteUser={voteUser}
        emitAbility={emitAbility}
        mafiaPickList={mafiaPickList}
        isNight={isNight}
        socketRef={socketRef}
      />
      <ChatContainer chatList={chatList} sendChat={sendChat} />
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
