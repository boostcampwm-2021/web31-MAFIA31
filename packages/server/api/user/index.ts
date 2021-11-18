import express from 'express';
import UserController from './user.controller';

const userRouter = express.Router();

userRouter.post('/stat', UserController.updateUsersStat);
userRouter.get('/:userName', UserController.getUser);

export default userRouter;
