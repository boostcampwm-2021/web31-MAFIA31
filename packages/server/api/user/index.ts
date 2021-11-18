import express from 'express';
import UserController from './user.controller';

const userRouter = express.Router();

userRouter.post('/update', UserController.updateUser);
userRouter.get('/:userName', UserController.getUser);

export default userRouter;
