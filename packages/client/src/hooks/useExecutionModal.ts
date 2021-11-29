import useModal from '@hooks/useModal';
import { CROSS_VOTE, PUBLISH_MAX_VOTE } from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import { Event } from '@src/types';
import { useEffect, useState } from 'react';
import useSocketEvent from './useSocketEvent';

const useVoteModal = () => {
  const { socketRef } = useSocketContext();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [maxVotedPlayer, setMaxVotedPlayer] = useState('');

  const updateMaxVotedPlayer = (player: string) => {
    if (!player) return;
    setMaxVotedPlayer(player);
    openModal();
  };

  const maxVotedEvent: Event = { event: PUBLISH_MAX_VOTE, handler: updateMaxVotedPlayer };
  useSocketEvent(socketRef, [maxVotedEvent]);

  const executionHandler = () => {
    socketRef.current?.emit(CROSS_VOTE);
    closeModal();
  };

  useEffect(() => {
    setTimeout(closeModal, 5000);
  }, [isModalOpen]);

  return { isModalOpen, maxVotedPlayer, closeModal, executionHandler };
};

export default useVoteModal;
