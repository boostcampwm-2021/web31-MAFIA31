import { createContext, FC, MutableRefObject, ReactNode, useContext, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface SocketValue {
  socketRef: MutableRefObject<Socket<any, any> | undefined>;
}

const SocketContext = createContext<SocketValue>({} as SocketValue);

export const useSocketContext = () => useContext(SocketContext);

interface Props {
  children: ReactNode;
}

const SocketProvider: FC<Props> = ({ children }) => {
  const socketRef = useRef<Socket>();

  return <SocketContext.Provider value={{ socketRef }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
