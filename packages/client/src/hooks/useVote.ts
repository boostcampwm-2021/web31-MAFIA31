import { PlayerInfo } from '@src/types';
import { PUBLISH_VOTE, VOTE } from 'domain/constants/event';
import { RoomVote } from 'domain/types/vote';
import { useEffect, useState } from 'react';

const useVote = (socketRef: any, myUserName: string) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([
    {
      userImg:
        'https://real-dnb.s3.ap-northeast-2.amazonaws.com/static/images/basic-profile-img.png',
      userName: 'user1',
      voteCnt: 0,
    },
    {
      userImg:
        'https://real-dnb.s3.ap-northeast-2.amazonaws.com/static/images/basic-profile-img.png',
      userName: 'user2',
      voteCnt: 0,
    },
    {
      userImg:
        'https://real-dnb.s3.ap-northeast-2.amazonaws.com/static/images/basic-profile-img.png',
      userName: 'user3',
      voteCnt: 0,
    },
  ]);
  const updatePlayerList = (roomVote: RoomVote): void => {
    setPlayerList((prev) =>
      prev.map((player) => ({ ...player, voteCnt: roomVote[player.userName] })),
    );
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VOTE, updatePlayerList);

    return () => {
      socketRef.current.off(PUBLISH_VOTE, updatePlayerList);
    };
  }, [socketRef.current]);

  const voteUser = (userName: string): void => {
    socketRef.current?.emit(VOTE, { from: myUserName, to: userName });
  };

  return { playerList, voteUser };
};

export default useVote;
