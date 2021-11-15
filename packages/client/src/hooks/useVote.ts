import { PUBLISH_VOTE, VOTE } from '@mafia/domain/constants/event';
import { RoomVote } from '@mafia/domain/types/vote';
import { useSocketContext } from '@src/contexts/socket';
import { PlayerInfo } from '@src/types';
import { useEffect, useState } from 'react';

const useVote = (myUserName: string) => {
  const { socketRef } = useSocketContext();
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([
    {
      userImg: '/assets/icons/profile.png',
      userName: 'user1',
      voteFrom: ['user2', 'user3'],
    },
    {
      userImg: '/assets/icons/profile.png',
      userName: 'user2',
      voteFrom: [],
    },
    {
      userImg: '/assets/icons/profile.png',
      userName: 'user3',
      voteFrom: [],
    },
  ]);
  const updatePlayerList = (roomVote: RoomVote): void => {
    setPlayerList((prev) =>
      prev.map((player) => ({ ...player, voteFrom: roomVote[player.userName] ?? [] })),
    );
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VOTE, updatePlayerList);

    return () => {
      socketRef.current?.off(PUBLISH_VOTE, updatePlayerList);
    };
  }, [socketRef.current]);

  const voteUser = (userName: string): void => {
    socketRef.current?.emit(VOTE, { from: myUserName, to: userName });
  };

  return { playerList, voteUser };
};

export default useVote;
