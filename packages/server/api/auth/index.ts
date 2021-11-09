import express from 'express';
import AuthController from './auth.controller';

const authRouter = express.Router();

authRouter.get('/user', AuthController.getUserInfo);

export default authRouter;
