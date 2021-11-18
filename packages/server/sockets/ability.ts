import * as EVENT from '@mafia/domain/constants/event';
import { StoryName } from '@mafia/domain/types/chat';
import { PoliceInvestigation } from '@mafia/domain/types/game';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

const VictimStore: Record<string, string> = {};
const SurvivorStore: Record<string, string> = {};

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  const victim = VictimStore[roomId];
  const survivor = SurvivorStore[roomId];

  if (victim === survivor) {
    namespace.emit(EVENT.PUBLISH_SURVIVOR, {
      userName: survivor,
      storyName: StoryName.PUBLISH_SURVIVOR,
    });
  } else {
    namespace.emit(EVENT.PUBLISH_VICTIM, {
      userName: survivor,
      storyName: StoryName.PUBLISH_VICTIM,
    });
    const newGameInfoList = GameStore.get(roomId).map((player) =>
      player.userName === victim ? { ...player, isDead: true } : player,
    );
    GameStore.set(roomId, newGameInfoList);
  }

  VictimStore[roomId] = '';
  SurvivorStore[roomId] = '';
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;
  const roomId = namespace.name;
  VictimStore[roomId] = '';

  socket.on(EVENT.MAFIA_ABILITY, (mafiaPick: string) => {
    VictimStore[roomId] = mafiaPick;
    namespace.to('mafia').emit(EVENT.MAFIA_ABILITY, VictimStore[roomId]);
  });

  socket.on(EVENT.POLICE_INVESTIGATION, (userName: string) => {
    const isMafia: boolean =
      GameStore.get(namespace.name).find((el) => el.userName === userName)?.job === 'mafia';

    const resData: PoliceInvestigation = { userName, isMafia };
    namespace.to('police').emit(EVENT.POLICE_INVESTIGATION, resData);
  });

  socket.on(EVENT.DOCTOR_ABILITY, (userName: string) => {
    SurvivorStore[roomId] = userName;
  });
};

export { abilitySocketInit, publishVictim };
