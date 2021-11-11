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
};

interface Memo {
  userName: string;
  guessJob: string;
}

const RightSideContainer: FC<PropType> = ({ playerStateList }) => {
  const [memoList] = useState<Memo[]>([
    { userName: 'user1', guessJob: 'mafia' },
    { userName: 'user2', guessJob: 'citizen' },
    { userName: 'user3', guessJob: 'doctor' },
    { userName: 'user4', guessJob: 'police' },
  ]);

  return (
    <div css={rightSideContainerStyle}>
      <div css={myJobStyle}>
        <Image size={ImageSizeList.MEDIUM} src="/assets/images/mafia.png" />
        <div className="jobInfo">
          <span className="job">마피아</span>
          <p className="jobDescript">밤에 시민을 한 명 죽일 수 있습니다.</p>
        </div>
      </div>
      <hr css={hrStyle} />
      <div css={memoListStyle}>
        {memoList.map(({ userName, guessJob }) => (
          <div css={memoInfoStyle}>
            <MemoButton
              key={userName}
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
