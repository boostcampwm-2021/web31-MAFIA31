/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useTimer from '@src/hooks/useTimer';
import useVote from '@hooks/useVote';
import useChat from '@hooks/useChat';
import useAbility from '@src/hooks/useAbility';
import { primaryDark, primaryLight, titleActive, white } from '@constants/index';
import ChatContainer from '@containers/ChatContainer';
import LeftSideContainer from '@containers/LeftSideContainer';
import RightSideContainer from '@containers/RightSideContainer';
import { useEffect, useState } from 'react';
import useGame from '@src/hooks/useGame';
import { PlayerState } from '@mafia/domain/types/game';
import { useLocation, useHistory } from 'react-router-dom';
import { useUserInfo } from '@src/contexts/userInfo';
import { PlayerInfo, Memo } from '@src/types';
import { User } from '@mafia/domain/types/user';

interface locationType {
  userList: PlayerInfo[];
}

const Game = () => {
  const { state } = useLocation<locationType>();
  const { userInfo } = useUserInfo();
  const history = useHistory();

  if (!state?.userList || !userInfo?.userName) {
    history.push('/');
    return <></>;
  }

  const { userList } = state;
  // const { userName: myName } = userInfo;

  const [playerStateList, setPlayerStateList] = useState<PlayerState[]>([]);
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const { chatList, sendChat, sendNightChat } = useChat();
  const { voteList, voteUser, initVote } = useVote();
  const { timer, isNight } = useTimer();
  const { emitAbility, mafiaPickList } = useAbility('mafia', setPlayerStateList);
  const { myJob } = useGame();

  const initPlayerState = (userList: User[]) => {
    setPlayerStateList(userList.map(({ userName }) => ({ userName, isDead: false })));
  };

  const initMemo = (userList: User[]) => {
    setMemoList(userList.map(({ userName }) => ({ userName, guessJob: 'question' })));
  };

  const init = () => {
    initVote(userList);
    initMemo(userList);
    initPlayerState(userList);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log('night', isNight);
  }, [isNight]);

  return (
    <div css={gamePageStyle(isNight)}>
      <LeftSideContainer
        playerStateList={playerStateList}
        playerList={voteList}
        timer={timer}
        voteUser={voteUser}
        emitAbility={emitAbility}
        mafiaPickList={mafiaPickList}
        isNight={isNight}
      />
      <ChatContainer
        chatList={chatList}
        sendChat={sendChat}
        sendNightChat={sendNightChat}
        isNight={isNight}
      />
      <RightSideContainer
        playerStateList={playerStateList}
        memoList={memoList}
        myJob={myJob}
        isNight={isNight}
      />
    </div>
  );
};

const gamePageStyle = (isNight: boolean) => css`
  display: flex;

  height: 100vh;
  color: ${isNight ? white : titleActive};
  background-color: ${isNight ? primaryDark : primaryLight};
`;

export default Game;
