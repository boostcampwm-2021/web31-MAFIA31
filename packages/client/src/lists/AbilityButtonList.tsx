import { FC, MutableRefObject, useCallback } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AbilityButton } from '@src/components/Button';
import { User } from '@mafia/domain/types/user';
import useAbility from '@hooks/useAbility';

interface PropType {
  initPlayers: User[];
  isNight: boolean;
  myJob: string;
  amIDead: MutableRefObject<boolean>;
}

const AbilityButtonList: FC<PropType> = ({ initPlayers, isNight, myJob, amIDead }) => {
  const { players, mafias, emitAbility, getSelectedImg } = useAbility(initPlayers, isNight, myJob);

  const handleClick = useCallback(
    (userName: string, isDead: boolean) => {
      if (amIDead.current) return;
      emitAbility(userName, isDead);
    },
    [amIDead.current, emitAbility],
  );

  const getStampImg = useCallback(
    (userName: string, isDead: boolean) => {
      if (amIDead.current) return '';
      return getSelectedImg(userName, isDead);
    },
    [amIDead.current, getSelectedImg],
  );

  return (
    <div css={abilityListStyle}>
      {players.map((player) => (
        <AbilityButton
          key={player.userName}
          player={player}
          isMafia={mafias.includes(player.userName)}
          stamp={getStampImg(player.userName, player.isDead)}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

const abilityListStyle = css`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 16px 4%;
`;

export default AbilityButtonList;
