import express from 'express';
import BadRequest from '../../error/BadRequset';
import RoomService from './room.service';

const checkRoomId = (roomId: string): boolean => {
  const regex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
  return !(!roomId || !regex.test(roomId));
};

const RoomController = {
  async getRoomList(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const roomList = await RoomService.find('ready');
      res.status(200).json({ roomList });
    } catch (error) {
      next(error);
    }
  },
  async getRoom(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { roomId } = req.params;
    if (!roomId) {
      next(new BadRequest('Request params not include roomId'));
      return;
    }
    if (!checkRoomId(roomId)) {
      next(new BadRequest('Request RoomId invalid.'));
      return;
    }

    try {
      const room = await RoomService.findOne(roomId);
      res.status(200).json({ room });
    } catch (error) {
      next(error);
    }
  },
  async addRoom(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { roomId } = req.body.newRoom;
    if (!roomId) {
      next(new BadRequest('Request body not include roomId.'));
      return;
    }
    if (!checkRoomId(roomId)) {
      next(new BadRequest('RoomId is not valid.'));
      return;
    }

    try {
      const newRoom = await RoomService.create(roomId);
      res.status(200).json(newRoom);
    } catch (error) {
      next(error);
    }
  },
  async updateRoomStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { roomId, status } = req.body;
    if (!roomId || !status) {
      next(new BadRequest('Request not include roomId or status'));
      return;
    }

    try {
      await RoomService.updateOne(roomId, status);
      res.status(200).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  },
};

export default RoomController;
