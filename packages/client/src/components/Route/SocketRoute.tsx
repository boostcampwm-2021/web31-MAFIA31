import { FC } from 'react';
import { Route } from 'react-router-dom';
import disconnectSocket from '@src/utils/disconnectSocket';

interface Prop {
  exact?: boolean;
  path: string;
  component: any;
  socket?: boolean;
}

const SocketRoute: FC<Prop> = ({ exact = false, path, component, socket = false }) => {
  if (!socket) {
    disconnectSocket();
  }
  return <Route exact={exact} path={path} component={component} />;
};

export default SocketRoute;
