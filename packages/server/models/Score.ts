import { Document, model, Schema } from 'mongoose';

export interface IScore extends Document {
  userName: string;
  score: number;
  date: Date;
}

const schema = new Schema({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true, default: new Date().toISOString().slice(0, 10) },
});

const Score = model<IScore>('Score', schema);

export default Score;
