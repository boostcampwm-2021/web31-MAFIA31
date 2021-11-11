const createJobCountArr = ({ mafia = 0, citizen = 0, police = 0, doctor = 0 }): string[] => [
  ...new Array(mafia).fill('mafia'),
  ...new Array(citizen).fill('citizen'),
  ...new Array(police).fill('police'),
  ...new Array(doctor).fill('doctor'),
];

const JOB_COUNT: object[] = [
  {},
  {},
  {},
  {},
  { mafia: 1, citizen: 3 },
  { mafia: 1, citizen: 4 },
  { mafia: 2, citizen: 4 },
  { mafia: 2, citizen: 5 },
  { mafia: 2, citizen: 6 },
  { mafia: 3, citizen: 6 },
  { mafia: 3, citizen: 7 },
  { mafia: 3, citizen: 8 },
  { mafia: 4, citizen: 8 },
];

const JOB_ARR: string[][] = JOB_COUNT.map((cnt) => createJobCountArr(cnt));

export { JOB_COUNT, JOB_ARR };
