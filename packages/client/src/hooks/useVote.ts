import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Vote } from '../../../domain/types/vote';

const VOTE = 'vote';
const PUBLISH_VOTE = 'publish vote';
const SOCKET_SERVER_URL = 'localhost:5001/';

interface PlayerInfo {
  userImg: string;
  nickname: string;
  voteCnt: number;
}

const useVote = (myNickname: string, roomId: string) => {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([
    {
      userImg:
        'https://real-dnb.s3.ap-northeast-2.amazonaws.com/static/images/basic-profile-img.png',
      nickname: 'nickname',
      voteCnt: 8,
    },
  ]);
  const socketRef = useRef<Socket | null>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(PUBLISH_VOTE, (vote: Vote): void => {
      const { to } = vote;
      setPlayerList((prev) =>
        prev.map((player) =>
          to === player.nickname ? { ...player, voteCnt: player.voteCnt + 1 } : player,
        ),
      );
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  const voteUser = (nickname: string): void => {
    socketRef.current?.emit(VOTE, { from: myNickname, to: nickname });
  };

  return { playerList, voteUser };
};

export default useVote;
