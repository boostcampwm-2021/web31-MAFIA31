import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type Props = {
  userName: string;
};

const VoteCard: FC<Props> = ({ userName }: Props) => {
  const USER_PROFILE_SRC = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
  return (
    <div css={voteCardStyle}>
      <img css={profileImageStyle} src={USER_PROFILE_SRC} alt="user profile" />
      <div css={voteCardRightStyle}>
        <div>{userName}</div>
      </div>
    </div>
  );
};

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
