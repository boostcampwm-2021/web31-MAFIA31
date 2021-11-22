import express from 'express';
import Room, { IRoom } from '../../models/Room';

const RoomController = {
  async getRoomList(req: express.Request, res: express.Response) {
    try {
      const roomList = await Room.find();
      res.status(200).json({ roomList });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
  async getRoom(req: express.Request, res: express.Response) {
    if (!req.params.roomId) {
      res.status(400).json({
        error: 'Request not include roomId',
      });
      return;
    }

    try {
      const roomId: string = req.params.roomId;
      const room = await Room.findOne({ roomId });
      res.status(200).json({ room });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
  async addRoom(req: express.Request, res: express.Response) {
    if (!req.body.newRoom) {
      res.status(400).json({
        error: 'Request not include newRoom',
      });
      return;
    }

    try {
      const newRoom: IRoom = req.body.newRoom;
      await Room.create(newRoom);
      res.status(200).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
  async updateRoomStatus(req: express.Request, res: express.Response) {
    if (!req.body.roomId || !req.body.status) {
      res.status(400).json({
        error: 'Request not include roomId or status',
      });
      return;
    }

    try {
      const roomId: string = req.body.roomId;
      const status: string = req.body.status;
      await Room.updateOne({ roomId }, { status });
      res.status(200).json({ result: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
};

export default RoomController;
