import { Event } from '@src/types';
import { MutableRefObject, useEffect } from 'react';
import { Socket } from 'socket.io-client';

const useSocketEvent = (
  socket: MutableRefObject<Socket<any, any> | undefined>,
  events: Event[],
  dependency: any[] = [],
) => {
  const attachEvents = () => {
    if (!socket.current) return;
    events.forEach(({ event, handler }) => socket.current!.on(event, handler));
  };

  const detachEvents = () => {
    if (!socket.current) return;
    events.forEach(({ event, handler }) => socket.current!.off(event, handler));
  };

  useEffect(() => {
    attachEvents();

    return () => {
      detachEvents();
    };
  }, [socket.current, ...dependency]);
};

export default useSocketEvent;
