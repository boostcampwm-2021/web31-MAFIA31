import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MemoModal from '@src/components/Modal/MemoModal';
import useModal from '@src/hooks/useModal';
import { Player } from '@src/types';
import { titleActive, white } from '@src/constants';
import { MemoButton } from '@src/components/Button';
import useJobMemo from '@src/hooks/useJobMemo';
import { User } from '@mafia/domain/types/user';

interface PropType {
  initPlayers: User[];
  players: Player[];
  isNight: boolean;
}

const MemoList: FC<PropType> = ({ initPlayers, players, isNight }) => {
  const { jobMemos, updateJobMemos } = useJobMemo(initPlayers);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const memoClickHandler = (userName: string) => {
    setSelectedUser(userName);
    openModal();
  };

  return (
    <div css={memoListStyle}>
      <MemoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        eventHandler={updateJobMemos}
        userName={selectedUser}
      />
      {jobMemos.map(({ userName, guessJob }, idx) => (
        <div css={memoInfoStyle(isNight)} key={userName}>
          <MemoButton
            userName={userName}
            guessJob={guessJob}
            isDead={players[idx].isDead}
            onClick={memoClickHandler}
          />
          <span>{userName}</span>
        </div>
      ))}
    </div>
  );
};

const memoListStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 8px 5%;
`;

const memoInfoStyle = (isNight: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
  width: 30%;
  font-size: 12px;
  color: ${isNight ? white : titleActive};

  @media (min-width: 1441px) {
    width: 22%;
  }
`;

export default MemoList;
