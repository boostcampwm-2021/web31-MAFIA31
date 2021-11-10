import express from 'express';
import RoomController from './room.controller';

const roomRouter = express.Router();

roomRouter.get('/', RoomController.getRoomList);

export default roomRouter;
