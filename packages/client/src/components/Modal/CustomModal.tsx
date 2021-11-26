import ReactModal from 'react-modal';
import { FC } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import { titleActive } from '@constants/index';

ReactModal.setAppElement('#root');

type PropType = {
  children: ReactJSXElement;
  isOpen: boolean;
  onRequestClose?: () => void;
  contentLabel: string;
  style?: { content?: any; overlay?: any };
};

const CustomModal: FC<PropType> = ({ children, isOpen, onRequestClose, contentLabel, style }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={{
      content: { ...modalStyle.content, ...style?.content },
      overlay: { ...style?.overlay },
    }}
    contentLabel={contentLabel}
  >
    {children}
  </ReactModal>
);

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '3% 5%',
    color: `${titleActive}`,
    transform: 'translate(-50%, -50%)',
  },
};

export default CustomModal;
