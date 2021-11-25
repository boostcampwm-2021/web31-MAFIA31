import { CROSS_VOTE, PUBLISH_MAX_VOTE } from '@mafia/domain/constants/event';
import { useSocketContext } from '@src/contexts/socket';
import { useEffect, useState } from 'react';

const useVoteModal = () => {
  const { socketRef } = useSocketContext();
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [maxVotePlayer, setMaxVotePlayer] = useState('');
  const updateMaxVotePlayer = (player: string) => {
    setMaxVotePlayer(player);
    if (player) {
      openVoteModal();
    }
  };

  const openVoteModal = () => {
    setIsVoteModalOpen(true);
  };

  const closeVoteModal = () => {
    setIsVoteModalOpen(false);
  };

  useEffect(() => {
    socketRef.current?.on(PUBLISH_MAX_VOTE, updateMaxVotePlayer);

    return () => {
      socketRef.current?.off(PUBLISH_MAX_VOTE, updateMaxVotePlayer);
    };
  });

  const crossVote = (): void => {
    socketRef.current?.emit(CROSS_VOTE);
    closeVoteModal();
  };

  return { isVoteModalOpen, closeVoteModal, maxVotePlayer, crossVote };
};

export default useVoteModal;
