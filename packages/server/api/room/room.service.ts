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
  async create(newRoomId: string) {
    const room = await Room.create({ roomId: newRoomId });
    return room;
  },
  async updateOne(roomId: string, status: string) {
    await Room.updateOne({ roomId }, { status });
  },
};

export default RoomService;
