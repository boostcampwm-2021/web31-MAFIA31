import { MAFIA_ABILITY, PUBLISH_VICTIM } from 'domain/constants/event';
import { MafiaPick } from 'domain/types/game';
import { PlayerInfo } from 'domain/types/user';
import { Namespace, Socket } from 'socket.io';

const mafiaPickList: MafiaPick[] = [];

const getRandomInt = (min: number, max: number) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin)) + ceilMin; // 최댓값은 제외, 최솟값은 포함
};

// 낮 됐다는 이벤트 받으면 호출할 함수
const publishVictim = (namespace: Namespace) => {
  if (mafiaPickList.length > 0) {
    const randNum = getRandomInt(0, mafiaPickList.length);
    const { victim } = mafiaPickList[randNum];
    namespace.emit(PUBLISH_VICTIM, victim);
  }
};
const abilitySocketInit = (namespace: Namespace, socket: Socket, playerList: PlayerInfo[]) => {
  socket.join('mafia'); // 일단 다 마피아라고 가정
  socket.on(MAFIA_ABILITY, (mafiaPick: MafiaPick) => {
    if (mafiaPickList.every((e) => e.mafia !== mafiaPick.mafia)) {
      mafiaPickList.push(mafiaPick);
    }
    namespace.to('mafia').emit(MAFIA_ABILITY, mafiaPickList);
  });
};

export { abilitySocketInit, publishVictim };
