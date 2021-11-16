import { PlayerResult } from '@mafia/domain/types/game';
import User from '../../models/User';

const UserService = {
  async findOneOrCreate(userName: string, profileImg: string) {
    const exist = await User.findOne({ userName });
    if (!exist) {
      await User.create({ userName, profileImg });
    }
  },
  async update({ userName, job, result }: PlayerResult) {
    const user = await User.findOne({ userName });
    if (!user) throw Error('user Not Found!');
    console.log('after job stat', user.jobStat);

    const newJobStat = {
      ...user.jobStat,
      [job]: {
        ...user.jobStat[job],
        cnt: user.jobStat[job].cnt + 1,
        winCnt: result ? user.jobStat[job].winCnt + 1 : user.jobStat[job].winCnt,
      },
    };
    console.log('after job stat', newJobStat);
    await user.update({ playCnt: user.playCnt + 1, jobStat: newJobStat });
  },
};

export default UserService;
