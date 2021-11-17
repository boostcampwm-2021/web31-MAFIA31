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
  async addRoom(req: express.Request, res: express.Response) {
    try {
      const newRoom: IRoom = req.body;
      await Room.create(newRoom);
      res.status(200).json(newRoom);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },
};

export default RoomController;
