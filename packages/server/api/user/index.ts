import express from 'express';
import ScoreController from '../score/score.controller';
import UserController from './user.controller';

const userRouter = express.Router();

userRouter.post('/stat', UserController.updateUsersStat);
userRouter.get('/:userName?', UserController.getUser);
userRouter.get('/:userName/scores', ScoreController.getUserScores);

export default userRouter;
