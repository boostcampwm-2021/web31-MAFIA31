import { PlayerResult } from '@mafia/domain/types/game';
import NotFoundError from '../../error/NotFoundError';
import User from '../../models/User';
import ScoreService from '../score/score.service';

const UserService = {
  async findOne(userName: string) {
    const user = await User.findOne({ userName });
    if (!user) {
      throw new NotFoundError('User Not Found');
    }
    return user;
  },
  async findOneOrCreate(userName: string, profileImg: string) {
    const exist = await User.findOne({ userName });
    if (!exist) {
      await User.create({ userName, profileImg });
    }
  },
  async update({ userName, job, result }: PlayerResult) {
    const user = await User.findOne({ userName });
    if (!user) throw new NotFoundError('User Not Found!');

    const newJobStat = {
      ...user.jobStat,
      [job]: {
        ...user.jobStat[job],
        cnt: user.jobStat[job].cnt + 1,
        winCnt: result ? user.jobStat[job].winCnt + 1 : user.jobStat[job].winCnt,
      },
    };

    const newScore = result ? user.score + 100 : user.score;
    await ScoreService.updateOneOrCreate(userName, newScore);
    await User.updateOne(
      { userName },
      { score: newScore, playCnt: user.playCnt + 1, jobStat: newJobStat },
    );
  },
};

export default UserService;
