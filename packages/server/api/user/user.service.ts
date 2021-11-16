import { PlayerResult } from '@mafia/domain/types/game';
import User from '../../models/User';

const UserService = {
  async getUser(userName: string) {
    const user = await User.findOne({ userName });
    return user;
  },
  async insertUser(userName: string, profileImg: string) {
    const user = await User.create({ userName, profileImg });
    return user;
  },
  async updateUser({ userName, job, result }: PlayerResult) {
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
