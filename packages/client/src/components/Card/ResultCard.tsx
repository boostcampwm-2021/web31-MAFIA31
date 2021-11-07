import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { white } from '../../constants/colors';

interface PropType {
  userName: string;
  job: string;
  isWinner: boolean;
}
const ResultCard: FC<PropType> = ({ userName, job, isWinner }) => (
  <div css={ResultCardStyle(isWinner)}>
    <div>{job}</div>
    <div>{userName}</div>
  </div>
);

const ResultCardStyle = (isWinner: boolean) => css`
  position: relative;
  width: 190px;
  height: 243px;

  background: ${white};
  box-shadow: 2px 2px 8px rgba(78, 65, 109, 0.25);
  border-color: ${isWinner ? 'red' : 'none'};
  border-radius: 20px;
`;

export default ResultCard;
