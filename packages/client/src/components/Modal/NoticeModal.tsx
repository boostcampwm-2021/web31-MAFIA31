import { FC } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import CustomModal from './CustomModal';

type PropType = {
  children: ReactJSXElement;
  isOpen: boolean;
  onRequestClose: () => void;
};

const NoticeModal: FC<PropType> = ({ children, isOpen, onRequestClose }) => (
  <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Notice Modal">
    {children}
  </CustomModal>
);

export default NoticeModal;
