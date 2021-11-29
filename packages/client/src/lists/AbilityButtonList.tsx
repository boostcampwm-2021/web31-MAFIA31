import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Player, Selected } from '@src/types';
import { AbilityButton } from '@src/components/Button';
import { useUserInfo } from '@src/contexts/userInfo';

interface PropType {
  players: Player[];
  mafias: string[];
  selected: Selected;
  emitAbility: any;
  getSelectedImg: any;
}

const AbilityButtonList: FC<PropType> = ({
  players,
  mafias,
  selected,
  emitAbility,
  getSelectedImg,
}) => {
  const { userInfo } = useUserInfo();

  const amIDead = () =>
    players.find(({ userName: playerName }) => playerName === userInfo?.userName)?.isDead;

  const handleClick = (userName: string, isDead: boolean) => {
    if (amIDead()) return;
    emitAbility(userName, isDead);
  };

  const getStampImg = (userName: string, isDead: boolean) => {
    if (amIDead()) return false;
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
