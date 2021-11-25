import { RoomInfo } from '@mafia/domain/types/room';
import Room from '../../models/Room';

const RoomService = {
  async find(status: string) {
    const roomList = await Room.find({ status });
    return roomList;
  },
  async findOne(roomId: string) {
    const room = await Room.findOne({ roomId });
    return room;
  },
  async create(newRoom: RoomInfo) {
    const room = await Room.create(newRoom);
    return room;
  },
  async updateOne(roomId: string, status: string) {
    await Room.updateOne({ roomId }, { status });
  },
  async deleteOne(roomId: string) {
    const room = await Room.deleteOne({ roomId });
    return room;
  },
};

export default RoomService;
