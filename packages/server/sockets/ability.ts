import { MAFIA_ABILITY, PUBLISH_VICTIM } from '@mafia/domain/constants/event';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

let victim: string = '';

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  namespace.emit(PUBLISH_VICTIM, victim);
  const newGameInfoList = GameStore.get(roomId).map((player) =>
    player.userName === victim ? { ...player, isDead: true } : player,
  );
  GameStore.set(roomId, newGameInfoList);
  console.log(GameStore.get(roomId));
  victim = '';
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;

  socket.on(MAFIA_ABILITY, (mafiaPick: string) => {
    victim = mafiaPick;
    namespace.to('mafia').emit(MAFIA_ABILITY, victim);
  });
};

export { abilitySocketInit, publishVictim };
