interface JobDictionary {
  [job: string]: {
    title: string;
    description: string;
  };
}

export const JOB_DICT: JobDictionary = {
  '': {
    title: 'loading',
    description: 'loading',
  },
  'mafia': {
    title: '마피아',
    description: '밤에 사람을 한 명 죽일 수 있습니다.',
  },
  'citizen': {
    title: '시민',
    description: '아무것도 아닌 선량한 시민입니다.',
  },
  'doctor': {
    title: '의사',
    description: '밤에 사람을 한 명 살릴 수 있습니다.',
  },
  'police': {
    title: '경찰',
    description: '밤에 임의의 한 명을 선택해 마피아인지 확인할 수 있습니다.',
  },
};
