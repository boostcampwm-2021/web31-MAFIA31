/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TIMER } from '@mafia/domain/constants/event';
import { titleActive, white } from '@src/constants';
import { useSocketContext } from '@src/contexts/socket';
import useSocketEvent from '@src/hooks/useSocketEvent';
import useTimer from '@src/hooks/useTimer';
import { Event } from '@src/types';

const Timer = () => {
  const { socketRef } = useSocketContext();
  const { timer, updateTimer } = useTimer();

  const timerEvent: Event = { event: TIMER, handler: updateTimer };
  useSocketEvent(socketRef, [timerEvent]);

  return (
    <div css={timerStyle}>
      <span>{timer}</span>
    </div>
  );
};

const timerStyle = css`
  padding: 10px;
  border-radius: 15px;
  background-color: ${white};
  box-shadow: 0px 4px 4px rgba(78, 65, 109, 0.25);

  span {
    display: block;
    font-weight: bold;
    text-align: center;

    height: 70px;
    font-size: 48px;
    line-height: 80px;
    letter-spacing: 0.1em;
    color: ${titleActive};
  }
`;

export default Timer;
