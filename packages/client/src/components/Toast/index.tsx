import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '@src/hooks/useToast';

interface PropType {
  isNight: boolean;
}

const Toast: FC<PropType> = ({ isNight }) => {
  useToast(isNight);

  return <ToastContainer position="top-center" autoClose={7000} hideProgressBar />;
};

export default Toast;
