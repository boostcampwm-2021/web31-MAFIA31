const timeDisplayer = (sec: number) => {
  const 시 = `${parseInt(`${sec / 3600}`, 10)}`.padStart(2, '0');
  const 분 = `${parseInt(`${(sec % 3600) / 60}`, 10)}`.padStart(2, '0');
  const 초 = `${parseInt(`${sec % 60}`, 10)}`.padStart(2, '0');

  return {
    시,
    분,
    초,
  };
};

export default timeDisplayer;
