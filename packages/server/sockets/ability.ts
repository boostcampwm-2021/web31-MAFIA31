import * as EVENT from '@mafia/domain/constants/event';
import { StoryName } from '@mafia/domain/types/chat';
import { PoliceInvestigation } from '@mafia/domain/types/game';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  const victim = GameStore.getVictim(roomId);
  const survivor = GameStore.getSurvivor(roomId);

  GameStore.resetSelected(roomId);

  if (victim === '' || victim !== survivor) {
    const deadSocketId = GameStore.getSocketId(roomId, victim);
    if (deadSocketId) {
      GameStore.diePlayer(roomId, victim);
      namespace.in(deadSocketId).socketsJoin('shaman');
    }

    namespace.emit(EVENT.PUBLISH_VICTIM, {
      userName: victim,
      storyName: StoryName.PUBLISH_VICTIM,
    });

    return;
  }

  namespace.emit(EVENT.PUBLISH_SURVIVOR, {
    userName: survivor,
    storyName: StoryName.PUBLISH_SURVIVOR,
  });
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;
  const roomId = namespace.name;
  GameStore.resetSelected(roomId);

  socket.on(EVENT.MAFIA_ABILITY, (userName: string) => {
    GameStore.setVictim(roomId, userName);
    namespace.to('mafia').emit(EVENT.MAFIA_ABILITY, GameStore.getVictim(roomId));
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
    GameStore.setSurvivor(roomId, userName);
  });
};

export { abilitySocketInit, publishVictim };
