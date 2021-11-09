import { PUBLISH_VOTE, VOTE } from 'domain/constants/event';
import { RoomVote } from 'domain/types/vote';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface PlayerInfo {
  userImg: string;
  userName: string;
  voteFrom: string[];
}

const useVote = (myUserName: string, roomId: string) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([
    {
      userImg: '/assets/icons/profile.svg',
      userName: 'user1',
      voteFrom: ['user2', 'user3'],
    },
    {
      userImg: '/assets/icons/profile.svg',
      userName: 'user2',
      voteFrom: [],
    },
    {
      userImg: '/assets/icons/profile.svg',
      userName: 'user3',
      voteFrom: [],
    },
  ]);
  const socketRef = useRef<Socket | null>();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001';

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on(PUBLISH_VOTE, (roomVote: RoomVote): void => {
      setPlayerList((prev) =>
        prev.map((player) => ({ ...player, voteFrom: roomVote[player.userName] })),
      );
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  const voteUser = (userName: string): void => {
    socketRef.current?.emit(VOTE, { from: myUserName, to: userName });
  };

  return { playerList, voteUser };
};

export default useVote;
