import { PlayerResult } from '@mafia/domain/types/game';
import { Request, Response } from 'express';
import UserService from './user.service';

const UserController = {
  async updateUser(req: Request, res: Response) {
    req.body.result.map(async (playerResult: PlayerResult) => {
      try {
        await UserService.update(playerResult);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    });
    res.status(200).json({ result: 'OK' });
  },
};

export default UserController;
