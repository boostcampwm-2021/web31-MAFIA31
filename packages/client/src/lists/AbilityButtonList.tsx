import { FC, MutableRefObject } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Player, Selected } from '@src/types';
import { AbilityButton } from '@src/components/Button';

interface PropType {
  players: Player[];
  mafias: string[];
  selected: Selected;
  emitAbility: any;
  getSelectedImg: any;
  amIDead: MutableRefObject<boolean>;
}

const AbilityButtonList: FC<PropType> = ({
  players,
  mafias,
  selected,
  emitAbility,
  getSelectedImg,
  amIDead,
}) => {
  const handleClick = (userName: string, isDead: boolean) => {
    if (amIDead.current) return;
    emitAbility(userName, isDead);
  };

  const getStampImg = (userName: string, isDead: boolean) => {
    if (amIDead.current) return false;
    return getSelectedImg(userName, isDead);
  };

  return (
    <div css={abilityListStyle}>
      {players.map((player) => (
        <AbilityButton
          key={player.userName}
          player={player}
          isMafia={mafias.includes(player.userName)}
          selected={selected}
          getStampImg={getStampImg}
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
