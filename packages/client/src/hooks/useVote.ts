import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomVote } from '../../../domain/types/vote';

const VOTE = 'vote';
const PUBLISH_VOTE = 'publish vote';
const SOCKET_SERVER_URL = 'localhost:5001/';

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
      userName: 'nickname',
      voteCnt: 8,
    },
  ]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
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
