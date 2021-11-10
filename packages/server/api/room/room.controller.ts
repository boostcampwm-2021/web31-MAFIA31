import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const RoomController = {
  async getRoomList(req: express.Request, res: express.Response) {
    console.log(req, res);
  },
};

export default RoomController;
