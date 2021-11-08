import { PUBLISH_VOTE, VOTE } from 'domain/constants/event';
import { RoomVote } from 'domain/types/vote';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface PlayerInfo {
  userImg: string;
  userName: string;
  voteCnt: number;
}

const useVote = (myUserName: string, roomId: string) => {
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
  const socketRef = useRef<Socket | null>();
  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || 'localhost:5001';

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      query: { roomId },
    });

    socketRef.current.on(PUBLISH_VOTE, (roomVote: RoomVote): void => {
      setPlayerList((prev) =>
        prev.map((player) => ({ ...player, voteCnt: roomVote[player.userName] })),
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
