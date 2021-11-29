import * as EVENT from '@mafia/domain/constants/event';
import { StoryName } from '@mafia/domain/types/chat';
import { Namespace, Socket } from 'socket.io';
import { STORY_DIC } from '../constants/story';
import GameStore from '../stores/GameStore';

const getStory = (storyName: StoryName, name: string = '') => {
  return {
    id: Date.now().toString(),
    msg: STORY_DIC[storyName].msg(name),
    imgSrc: STORY_DIC[storyName].src,
    type: STORY_DIC[storyName].type,
  };
};

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  const victim = GameStore.getVictim(roomId);
  const survivor = GameStore.getSurvivor(roomId);

  GameStore.resetSelected(roomId);

  if (victim === '') {
    namespace.emit(EVENT.PUBLISH_STORY, getStory(StoryName.NO_KILL));
    return;
  }

  if (victim !== survivor) {
    const deadSocketId = GameStore.getSocketId(roomId, victim);
    if (deadSocketId) {
      GameStore.diePlayer(roomId, victim);
      namespace.in(deadSocketId).socketsJoin('shaman');
    }

    namespace.emit(EVENT.PUBLISH_VICTIM, victim);
    namespace.emit(EVENT.PUBLISH_STORY, getStory(StoryName.PUBLISH_VICTIM, victim));
    return;
  }

  namespace.emit(EVENT.PUBLISH_SURVIVOR, survivor);
  namespace.emit(EVENT.PUBLISH_STORY, getStory(StoryName.PUBLISH_SURVIVOR, survivor));
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
    namespace.to('police').emit(EVENT.POLICE_ABILITY, userName);

    if (isMafia) {
      namespace.to('police').emit(EVENT.PUBLISH_STORY, getStory(StoryName.POLICE_CATCH, userName));
      return;
    }

    namespace.to('police').emit(EVENT.PUBLISH_STORY, getStory(StoryName.POLICE_WRONG, userName));
  });

  socket.on(EVENT.DOCTOR_ABILITY, (userName: string) => {
    GameStore.setSurvivor(roomId, userName);
    namespace.to('doctor').emit(EVENT.DOCTOR_ABILITY, GameStore.getSurvivor(roomId));
  });
};

export { abilitySocketInit, publishVictim };
