import ConfirmModal from '@src/components/Modal/ConfirmModal';
import useExecutionModal from '@src/hooks/useExecutionModal';
import { memo, MutableRefObject } from 'react';
import { useHistory } from 'react-router-dom';

interface PropType {
  amIDead: MutableRefObject<boolean>;
  isRoomOutModalOpen: any;
  closeRoomOutModal: any;
}

const GamePageModalContainer = memo(
  ({ amIDead, isRoomOutModalOpen, closeRoomOutModal }: PropType) => {
    const history = useHistory();

    const {
      isModalOpen: isExecutionModalOpen,
      maxVotedPlayer,
      closeModal: closeExecutionModal,
      executionHandler,
    } = useExecutionModal();

    const roomOutHandler = () => {
      closeRoomOutModal();
      history.push('/rooms');
    };

    return (
      <>
        <ConfirmModal
          isOpen={isRoomOutModalOpen}
          onRequestClose={closeRoomOutModal}
          eventHandler={roomOutHandler}
          closeModal={closeRoomOutModal}
        >
          <p>진행중인 게임을 포기하고 나가시겠습니까?</p>
        </ConfirmModal>
        <ConfirmModal
          isOpen={amIDead.current ? false : isExecutionModalOpen}
          eventHandler={executionHandler}
          closeModal={closeExecutionModal}
        >
          <p>{maxVotedPlayer}을(를) 투표로 처형할까요?</p>
        </ConfirmModal>
      </>
    );
  },
);

export default GamePageModalContainer;
