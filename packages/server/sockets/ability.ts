import { MAFIA_ABILITY, POLICE_INVESTIGATION, PUBLISH_VICTIM } from '@mafia/domain/constants/event';
import { PoliceInvestigation } from '@mafia/domain/types/game';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

const VictimStore: Record<string, string> = {};

const publishVictim = (namespace: Namespace) => {
  const roomId = namespace.name;
  const victim = VictimStore[roomId];
  namespace.emit(PUBLISH_VICTIM, victim);
  const newGameInfoList = GameStore.get(roomId).map((player) =>
    player.userName === victim ? { ...player, isDead: true } : player,
  );
  GameStore.set(roomId, newGameInfoList);
  VictimStore[roomId] = '';
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;
  const roomId = namespace.name;
  VictimStore[roomId] = '';

  socket.on(MAFIA_ABILITY, (mafiaPick: string) => {
    VictimStore[roomId] = mafiaPick;
    namespace.to('mafia').emit(MAFIA_ABILITY, VictimStore[roomId]);
  });

  socket.on(POLICE_INVESTIGATION, (userName: string) => {
    const isMafia: boolean =
      GameStore.get(namespace.name).find((el) => el.userName === userName)?.job === 'mafia';

    const resData: PoliceInvestigation = { userName, isMafia };
    namespace.to('police').emit(POLICE_INVESTIGATION, resData);
  });
};

export { abilitySocketInit, publishVictim };
