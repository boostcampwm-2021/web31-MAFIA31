import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { primaryLight } from '../constants/index';
import VoteCard from '../components/Card/VoteCard';
import { User } from '../../../domain/types/user';

type Props = {
  roomId: string;
  userList: User[];
};

const GameLeftSideContainer: FC<Props> = ({ roomId, userList }: Props) => (
  <div css={GameLeftSideContainerStyle}>
    {userList.map((user) => (
      <VoteCard key={user.userName} userName={user.userName} roomId={roomId} />
    ))}
  </div>
);

const GameLeftSideContainerStyle = css`
  width: 400px;
  height: 100%;

  background: ${primaryLight};
`;

export default GameLeftSideContainer;
