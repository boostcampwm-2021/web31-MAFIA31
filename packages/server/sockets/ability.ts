import * as EVENT from '@mafia/domain/constants/event';
import { StoryName } from '@mafia/domain/types/chat';
import { PoliceInvestigation } from '@mafia/domain/types/game';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

interface VictimData {
  prevVictim: string;
  currVictim: string;
}

const VictimStore: Record<string, VictimData> = {};
const SurvivorStore: Record<string, string> = {};

const resetVictimStore = (roomId: string) => {
  VictimStore[roomId] = { prevVictim: '', currVictim: '' };
};

const updateVictim = (roomId: string) => {
  const { prevVictim, currVictim } = VictimStore[roomId];
  const newGameInfoList = GameStore.get(roomId).map((player) =>
    // eslint-disable-next-line no-nested-ternary
    player.userName === prevVictim
      ? { ...player, isDead: false }
      : player.userName === currVictim
      ? { ...player, isDead: true }
      : player,
  );
  GameStore.set(roomId, newGameInfoList);
};

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  const { currVictim } = VictimStore[roomId];
  const survivor = SurvivorStore[roomId];

  if (currVictim === survivor) {
    namespace.emit(EVENT.PUBLISH_SURVIVOR, {
      userName: survivor,
      storyName: StoryName.PUBLISH_SURVIVOR,
    });
  } else {
    namespace.emit(EVENT.PUBLISH_VICTIM, {
      userName: currVictim,
      storyName: StoryName.PUBLISH_VICTIM,
    });
  }
  resetVictimStore(roomId);
  SurvivorStore[roomId] = '';
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;
  const roomId = namespace.name;
  resetVictimStore(roomId);

  socket.on(EVENT.MAFIA_ABILITY, (mafiaPick: string) => {
    VictimStore[roomId].prevVictim = VictimStore[roomId].currVictim;
    VictimStore[roomId].currVictim = mafiaPick;
    namespace.to('mafia').emit(EVENT.MAFIA_ABILITY, VictimStore[roomId].currVictim);
    updateVictim(roomId);
  });

  socket.on(EVENT.POLICE_ABILITY, (userName: string) => {
    if (!GameStore.getCanInvest()) {
      return;
    }
    GameStore.setCanInvest(false);

    const isMafia: boolean =
      GameStore.get(namespace.name).find((el) => el.userName === userName)?.job === 'mafia';

    const data: PoliceInvestigation = {
      userName,
      storyName: StoryName.POLICE_ABILITY,
      isMafia,
    };

    namespace.to('police').emit(EVENT.POLICE_ABILITY, data);
  });

  socket.on(EVENT.DOCTOR_ABILITY, (userName: string) => {
    SurvivorStore[roomId] = userName;
  });
};

export { abilitySocketInit, publishVictim };
