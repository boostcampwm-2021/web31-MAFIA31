import { PlayerResult } from '@mafia/domain/types/game';
import { Request, Response } from 'express';
import UserService from './user.service';

const UserController = {
  async updateUsersStat(req: Request, res: Response) {
    await Promise.all(
      req.body.result.map((playerResult: PlayerResult) => UserService.update(playerResult)),
    ).catch((error) => {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    });
    res.status(200).json({ result: 'Success' });
  },

  async getUser(req: Request, res: Response) {
    if (!req.params.userName) {
      res.status(400).json({
        error: 'Request not include userName',
      });
      return;
    }
    try {
      const stat = await UserService.findOne(req.params.userName);
      res.status(200).json(stat);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  },
};

export default UserController;
