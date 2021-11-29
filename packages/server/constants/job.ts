interface JobCount {
  mafia?: number;
  citizen?: number;
  police?: number;
  doctor?: number;
  shaman?: number;
}

const createJobCountArr = ({
  mafia = 0,
  citizen = 0,
  police = 0,
  doctor = 0,
  shaman = 0,
}): string[] => [
  ...Array(mafia).fill('mafia'),
  ...Array(citizen).fill('citizen'),
  ...Array(police).fill('police'),
  ...Array(doctor).fill('doctor'),
  ...Array(shaman).fill('shaman'),
];

const JOB_COUNT: JobCount[] = [
  {},
  { mafia: 1 },
  { mafia: 1, citizen: 1 },
  { mafia: 1, citizen: 1, police: 1 },
  { mafia: 1, citizen: 1, police: 1, doctor: 1 },
  { mafia: 1, citizen: 1, police: 1, doctor: 1, shaman: 1 },
  { mafia: 2, citizen: 1, police: 1, doctor: 1, shaman: 1 },
  { mafia: 2, citizen: 2, police: 1, doctor: 1, shaman: 1 },
  { mafia: 2, citizen: 3, police: 1, doctor: 1, shaman: 1 },
  { mafia: 3, citizen: 3, police: 1, doctor: 1, shaman: 1 },
  { mafia: 3, citizen: 4, police: 1, doctor: 1, shaman: 1 },
  { mafia: 3, citizen: 5, police: 1, doctor: 1, shaman: 1 },
  { mafia: 3, citizen: 6, police: 1, doctor: 1, shaman: 1 },
];

const JOB_ARR: string[][] = JOB_COUNT.map((cnt) => createJobCountArr(cnt));

export { JOB_COUNT, JOB_ARR };
