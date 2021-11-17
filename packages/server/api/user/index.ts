import express from 'express';
import UserController from './user.controller';

const userRouter = express.Router();

userRouter.post('/update', UserController.updateUser);

export default userRouter;
