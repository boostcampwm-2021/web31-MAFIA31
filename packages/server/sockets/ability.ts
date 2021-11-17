import { MAFIA_ABILITY, POLICE_INVESTIGATION, PUBLISH_VICTIM } from '@mafia/domain/constants/event';
import { MafiaPick, PoliceInvestigation } from '@mafia/domain/types/game';
import { Namespace, Socket } from 'socket.io';
import GameStore from '../stores/GameStore';

const mafiaPickList: MafiaPick[] = [];

const getRandomInt = (min: number, max: number) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin)) + ceilMin; // 최댓값은 제외, 최솟값은 포함
};

// 낮 됐다는 이벤트 받으면 호출할 함수
const publishVictim = (namespace: Namespace) => {
  const { name: roomId } = namespace;
  if (mafiaPickList.length > 0) {
    const randNum = getRandomInt(0, mafiaPickList.length);
    let { victim } = mafiaPickList[randNum];
    GameStore.diePlayer(roomId, victim);
    namespace.emit(PUBLISH_VICTIM, victim);
    mafiaPickList.length = 0;
    victim = '';
  }
};

const abilitySocketInit = (socket: Socket) => {
  const { nsp: namespace } = socket;

  socket.on(MAFIA_ABILITY, (mafiaPick: MafiaPick) => {
    if (mafiaPickList.every((e) => e.mafia !== mafiaPick.mafia)) {
      mafiaPickList.push(mafiaPick);
    }
    namespace.to('mafia').emit(MAFIA_ABILITY, mafiaPickList);
  });

  socket.on(POLICE_INVESTIGATION, (userName: string) => {
    const isMafia: boolean =
      GameStore.get(namespace.name).find((el) => el.userName === userName)?.job === 'mafia';

    const resData: PoliceInvestigation = { userName, isMafia };
    namespace.to('police').emit(POLICE_INVESTIGATION, resData);
  });
};

export { abilitySocketInit, publishVictim };
