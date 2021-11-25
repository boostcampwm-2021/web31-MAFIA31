interface JobDictionary {
  [job: string]: {
    title: string;
    description: string;
    imageSrc: string;
  };
}

export const JOB_DICT: JobDictionary = {
  '': {
    title: 'loading',
    description: 'loading',
    imageSrc: 'assets/images/user.png',
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
  'shaman': {
    title: '영매',
    description: '죽은 사람들의 채팅을 볼 수 있습니다.',
    imageSrc: 'assets/images/shaman.png',
  },
};
