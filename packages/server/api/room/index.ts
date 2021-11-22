import express from 'express';
import RoomController from './room.controller';

const roomRouter = express.Router();

roomRouter.get('/', RoomController.getRoomList);
roomRouter.get('/:roomId', RoomController.getRoom);
roomRouter.post('/', RoomController.addRoom);
roomRouter.put('/', RoomController.updateRoomStatus);

export default roomRouter;
