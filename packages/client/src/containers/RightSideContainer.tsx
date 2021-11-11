import { FC, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PlayerState } from '@mafia/domain/types/user';
import { grey1, white } from '@constants/index';
import { SearchIcon } from '@components/Icon';
import { MemoButton, IconButton, ButtonSizeList, ButtonThemeList } from '@components/Button';
import { ImageSizeList, Image } from '@components/Image';

type PropType = {
  playerStateList: PlayerState[];
  myJob: string;
};

interface Memo {
  userName: string;
  guessJob: string;
}

interface JobDictionary {
  [job: string]: {
    title: string;
    description: string;
  };
}

const RightSideContainer: FC<PropType> = ({ playerStateList, myJob }) => {
  const JOB_DICT: JobDictionary = {
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
  const [memoList] = useState<Memo[]>([
    { userName: 'user1', guessJob: 'mafia' },
    { userName: 'user2', guessJob: 'citizen' },
    { userName: 'user3', guessJob: 'doctor' },
    { userName: 'user4', guessJob: 'police' },
  ]);

  return (
    <div css={rightSideContainerStyle}>
      <div css={myJobStyle}>
        <Image size={ImageSizeList.MEDIUM} src={`/assets/images/${myJob}.png`} />
        <div className="jobInfo">
          <span className="job">{JOB_DICT[myJob].title}</span>
          <p className="jobDescript">{JOB_DICT[myJob].description}</p>
        </div>
      </div>
      <hr css={hrStyle} />
      <div css={memoListStyle}>
        {memoList.map(({ userName, guessJob }) => (
          <div css={memoInfoStyle} key={userName}>
            <MemoButton
              userName={userName}
              guessJob={guessJob}
              isDead={playerStateList.filter((player) => player.userName === userName)[0].isDead}
            />
            <span>{userName}</span>
          </div>
        ))}
      </div>
      <hr css={hrStyle} />
      <div css={searchButtonStyle}>
        <IconButton
          icon={SearchIcon}
          size={ButtonSizeList.MEDIUM}
          theme={ButtonThemeList.LIGHT}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const rightSideContainerStyle = css`
  position: relative;

  width: 23%;
  height: 100%;
  padding: 40px;
`;

const myJobStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${white};
  gap: 14px;

  .jobInfo {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 10px;

    .job {
      font-weight: bold;
      font-size: 18px;
    }
    .jobDescript {
      font-size: 15px;
    }
  }
`;

const hrStyle = css`
  border: 0;
  margin: 24px 0;
  border-top: 1px solid ${grey1};
`;

const memoListStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 8px 5%;
`;

const memoInfoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${white};

  gap: 5px;
  width: 30%;
  font-size: 12px;
  color: ${white};
`;

const searchButtonStyle = css`
  position: absolute;
  right: 40px;
  bottom: 40px;
`;

export default RightSideContainer;
