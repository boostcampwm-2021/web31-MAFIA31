import { PlayerResult } from '@mafia/domain/types/game';
import { Request, Response } from 'express';
import UserService from './user.service';

const UserController = {
  async updateUser(req: Request, res: Response) {
    req.body.result.map(async (playerResult: PlayerResult) => {
      await UserService.update(playerResult);
    });
    res.json({ result: 'OK' });
  },
};

export default UserController;
