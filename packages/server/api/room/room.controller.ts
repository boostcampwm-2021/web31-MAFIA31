import dotenv from 'dotenv';
import express from 'express';
import Room, { IRoom } from '../../models/Room';

dotenv.config();

const RoomController = {
  async getRoomList(req: express.Request, res: express.Response) {
    try {
      const roomList = await Room.find();
      res.json({ roomList });
    } catch (error) {
      console.log(error);
    }
  },
  async addRoom(req: express.Request, res: express.Response) {
    try {
      const newRoom: IRoom = req.body;
      await Room.create(newRoom);

      res.json(newRoom);
    } catch (error) {
      console.log(error);
    }
  },
};

export default RoomController;
