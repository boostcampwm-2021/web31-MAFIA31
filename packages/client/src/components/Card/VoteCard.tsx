import { FC, useEffect, useRef } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { io, Socket } from 'socket.io-client';

type Props = {
  roomId: string;
  userName: string;
};

interface Vote {
  from: string;
  to: string;
}

const VoteCard: FC<Props> = ({ roomId, userName }: Props) => {
  const SOCKET_SERVER_URL = 'localhost:5001/';
  const myName = 'myName';
  const USER_PROFILE_SRC = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
  const socketRef = useRef<Socket | null>();

  const onClick = (voteContent: Vote) => {
    socketRef.current?.emit('vote', voteContent);
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    return () => {
      socketRef.current!.disconnect();
    };
  }, [roomId]);

  return (
    <button
      css={buttonStyle}
      type="button"
      onClick={() => {
        onClick({ from: myName, to: userName });
      }}
    >
      <div css={voteCardStyle}>
        <img css={profileImageStyle} src={USER_PROFILE_SRC} alt="user profile" />
        <div css={voteCardRightStyle}>
          <div>{userName}</div>
        </div>
      </div>
    </button>
  );
};

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
`;

const voteCardStyle = css`
  display: flex;
  padding: 12px;

  width: 152px;
  height: 75px;

  background: #ffffff;
  box-shadow: 1px 2px 4px rgba(78, 65, 109, 0.25);
  border-radius: 15px;
`;

const profileImageStyle = css`
  width: 18px;
  height: 18px;
`;

const voteCardRightStyle = css`
  display: flex;
  flex-direction: column;
`;
export default VoteCard;
