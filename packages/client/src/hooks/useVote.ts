import { PUBLISH_VOTE, VOTE } from '@mafia/domain/constants/event';
import { User } from '@mafia/domain/types/user';
import { RoomVote } from '@mafia/domain/types/vote';
import { useSocketContext } from '@src/contexts/socket';
import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect, useState } from 'react';

const useVote = () => {
  const { userInfo } = useUserInfo();
  const { socketRef } = useSocketContext();
  const [voteList, setVoteList] = useState<RoomVote[]>([]);
  const updatePlayerList = (roomVote: RoomVote[]): void => setVoteList(roomVote);

  useEffect(() => {
    socketRef.current?.on(PUBLISH_VOTE, updatePlayerList);

    return () => {
      socketRef.current?.off(PUBLISH_VOTE, updatePlayerList);
    };
  }, [socketRef.current]);

  const voteUser = (userName: string): void => {
    socketRef.current?.emit(VOTE, { from: userInfo?.userName, to: userName });
  };

  const initVote = (userList: User[]) => {
    setVoteList(userList.map((user) => ({ ...user, voteCount: 0 })));
  };

  return { voteList, voteUser, initVote };
};

export default useVote;
