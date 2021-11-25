interface Job {
  job: string;
  jobKr: string;
  image: string;
}

interface JobDictionary {
  [job: string]: {
    title: string;
    description: string;
    imageSrc: string;
  };
}

export const JOB_ARR: Job[] = [
  { job: 'mafia', jobKr: '마피아', image: 'assets/images/mafia.png' },
  { job: 'police', jobKr: '경찰', image: 'assets/images/police.png' },
  { job: 'doctor', jobKr: '의사', image: 'assets/images/doctor.png' },
  { job: 'medium', jobKr: '영매', image: 'assets/images/medium.png' },
  { job: 'citizen', jobKr: '시민', image: 'assets/images/citizen.png' },
  { job: 'question', jobKr: '미정', image: 'assets/images/question.png' },
];

export const JOB_DICT: JobDictionary = {
  '': {
    title: 'loading',
    description: 'loading',
    imageSrc: 'assets/images/loading.gif',
  },
  'mafia': {
    title: '마피아',
    description: '밤에 사람을 한 명 죽일 수 있습니다.',
    imageSrc: 'assets/images/mafia.png',
  },
  'citizen': {
    title: '시민',
    description: '아무것도 아닌 선량한 시민입니다.',
    imageSrc: 'assets/images/citizen.png',
  },
  'doctor': {
    title: '의사',
    description: '밤에 사람을 한 명 살릴 수 있습니다.',
    imageSrc: 'assets/images/doctor.png',
  },
  'police': {
    title: '경찰',
    description: '밤에 임의의 한 명을 선택해 마피아인지 확인할 수 있습니다.',
    imageSrc: 'assets/images/police.png',
  },
  'medium': {
    title: '영매',
    description: '죽은 사람들의 채팅을 볼 수 있습니다.',
    imageSrc: 'assets/images/medium.png',
  },
};
