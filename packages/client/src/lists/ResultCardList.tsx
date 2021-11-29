import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerResult } from '@mafia/domain/types/game';
import { ResultCard } from '@src/components/Card';

interface PropType {
  playerResultList: PlayerResult[];
}

const ResultCardList: FC<PropType> = ({ playerResultList }) => (
  <div css={resultCardListStyle}>
    {playerResultList.map(({ userName, job, result }) => (
      <ResultCard key={userName} userName={userName} job={job} win={result} />
    ))}
  </div>
);

const resultCardListStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;

  gap: 20px 30px;
  width: 100%;
  height: 100%;
  padding: 30px 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ResultCardList;
