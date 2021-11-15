import { PUBLISH_VOTE, VOTE } from '@mafia/domain/constants/event';
import { RoomVote } from '@mafia/domain/types/vote';
import { useEffect, useState } from 'react';

const useVote = (socketRef: any, myUserName: string) => {
  const [voteList, setVoteList] = useState<RoomVote[]>([]);
  const updatePlayerList = (roomVote: RoomVote[]): void => setVoteList(roomVote);

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VOTE, updatePlayerList);

    return () => {
      socketRef.current.off(PUBLISH_VOTE, updatePlayerList);
    };
  }, [socketRef.current]);

  const voteUser = (userName: string): void => {
    socketRef.current?.emit(VOTE, { from: myUserName, to: userName });
  };

  return { voteList, voteUser };
};

export default useVote;
