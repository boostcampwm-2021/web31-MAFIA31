import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  profileImg: string;
  score: number;
  playCnt: number;
  jobStat: {
    [job: string]: {
      killRate: number;
      winRate: number;
      cnt: number;
      winCnt: number;
      mvpCnt: number;
    };
  };
}

const schema = new Schema({
  userName: { type: String, required: true },
  profileImg: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
  playCnt: { type: Number, required: true, default: 0 },
  jobStat: {
    type: Object,
    required: true,
    default: {
      mafia: { killRate: 0, winRate: 0, cnt: 0, winCnt: 0, mvpCnt: 0 },
      citizen: { killRate: 0, winRate: 0, cnt: 0, winCnt: 0, mvpCnt: 0 },
      police: { killRate: 0, winRate: 0, cnt: 0, winCnt: 0, mvpCnt: 0 },
      doctor: { killRate: 0, winRate: 0, cnt: 0, winCnt: 0, mvpCnt: 0 },
      shaman: { killRate: 0, winRate: 0, cnt: 0, winCnt: 0, mvpCnt: 0 },
    },
  },
});

const User = model<IUser>('User', schema);

export default User;
