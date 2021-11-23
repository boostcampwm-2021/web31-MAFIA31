import Modal from 'react-modal';
import { FC } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import { titleActive } from '@constants/index';

Modal.setAppElement('#root');

type PropType = {
  children: ReactJSXElement;
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
};

export const CustomModal: FC<PropType> = ({ children, isOpen, onRequestClose, contentLabel }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={modalStyle}
    contentLabel={contentLabel}
  >
    {children}
  </Modal>
);

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '3% 5%',
    marginRight: '-50%',
    color: `${titleActive}`,
    transform: 'translate(-50%, -50%)',
  },
};

export default CustomModal;
