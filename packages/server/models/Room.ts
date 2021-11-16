import { Document, model, Schema } from 'mongoose';

export interface IRoom extends Document {
  roomId: string;
  title: string;
  host: string;
}

const schema = new Schema({
  roomId: { type: String, required: true },
  title: { type: String, required: true },
  host: { type: String, required: true },
});

const Room = model<IRoom>('Room', schema);

export default Room;
