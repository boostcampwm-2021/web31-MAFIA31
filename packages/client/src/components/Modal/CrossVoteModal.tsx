import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import { primaryDark, white } from '@constants/index';
import CustomModal from './CustomModal';

type PropType = {
  children: ReactJSXElement;
  isOpen: boolean;
  eventHandler: any;
  closeModal: () => void;
  amIDead: boolean;
};

export const CrossVoteModal: FC<PropType> = ({
  children,
  isOpen,
  eventHandler,
  closeModal,
  amIDead,
}) => (
  <CustomModal isOpen={amIDead ? false : isOpen} contentLabel="Confirm Modal">
    <>
      {children}
      <div css={buttonPairStyle}>
        <button type="button" className="prefer-button" onClick={eventHandler}>
          예
        </button>
        <button type="button" className="cancel-button" onClick={closeModal}>
          아니오
        </button>
      </div>
    </>
  </CustomModal>
);

const buttonPairStyle = css`
  display: flex;
  justify-content: space-around;

  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;

    padding: 5px 16px;
    border-radius: 10px;
  }

  .prefer-button {
    color: ${white};
    background-color: ${primaryDark};
  }

  .cancel-button {
    border: 1px solid ${primaryDark};
  }
`;

export default CrossVoteModal;
