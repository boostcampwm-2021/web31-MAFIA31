import express from 'express';
import AuthController from './auth.controller';

const authRouter = express.Router();

authRouter.get('/user', AuthController.getAcccessToken);

export default authRouter;
