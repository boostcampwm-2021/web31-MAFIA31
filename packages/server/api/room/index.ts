import express from 'express';
import RoomController from './room.controller';

const roomRouter = express.Router();

roomRouter.get('/', RoomController.getRoomList);
roomRouter.post('/', RoomController.addRoom);

export default roomRouter;
