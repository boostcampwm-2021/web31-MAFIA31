const createJobCountArr = ({ mafia = 0, citizen = 0, police = 0, doctor = 0 }): string[] => [
  ...new Array(mafia).fill('mafia'),
  ...new Array(citizen).fill('citizen'),
  ...new Array(police).fill('police'),
  ...new Array(doctor).fill('doctor'),
];

const JOB_COUNT: object[] = [
  {},
  { mafia: 1 },
  { mafia: 1, citizen: 1 },
  { mafia: 1, citizen: 1, police: 1 },
  { mafia: 1, citizen: 2, police: 1 },
  { mafia: 1, citizen: 3, police: 1 },
  { mafia: 2, citizen: 3, police: 1 },
  { mafia: 2, citizen: 4, police: 1 },
  { mafia: 2, citizen: 5, police: 1 },
  { mafia: 3, citizen: 5, police: 1 },
  { mafia: 3, citizen: 6, police: 1 },
  { mafia: 3, citizen: 7, police: 1 },
  { mafia: 4, citizen: 7, police: 1 },
];

const JOB_ARR: string[][] = JOB_COUNT.map((cnt) => createJobCountArr(cnt));

export { JOB_COUNT, JOB_ARR };
