import express from 'express';
import InternalServerError from '../../error/InternalServerError';
import InvalidRoomIdError from '../../error/InvalidRoomIdError';
import Room, { IRoom } from '../../models/Room';

const checkRoomId = (roomId: string): boolean => {
  if (!roomId) {
    return false;
  }

  const regex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
  if (!regex.test(roomId)) {
    return false;
  }

  return true;
};

const RoomController = {
  async getRoomList(req: express.Request, res: express.Response) {
    try {
      const roomList = await Room.find();
      res.status(200).json({ roomList });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  async addRoom(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const newRoom: IRoom = req.body;

      if (!checkRoomId(newRoom.roomId)) {
        throw new InvalidRoomIdError();
      }

      await Room.create(newRoom);
      res.status(200).json(newRoom);
    } catch (error) {
      if (error instanceof InvalidRoomIdError) {
        next(error);
      }

      next(new InternalServerError());
    }
  },
};

export default RoomController;
