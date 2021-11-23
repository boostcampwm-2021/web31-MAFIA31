import { PlayerResult } from '@mafia/domain/types/game';
import express from 'express';
import BadRequest from '../../error/BadRequset';
import UserService from './user.service';

const UserController = {
  async updateUsersStat(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      await Promise.all(
        req.body.result.map((playerResult: PlayerResult) => UserService.update(playerResult)),
      );
      res.status(200).json({ result: 'Success' });
    } catch (error) {
      next(error);
    }
  },

  async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userName } = req.params;
    if (!userName) {
      next(new BadRequest('Request not include userName'));
      return;
    }
    try {
      const stat = await UserService.findOne(req.params.userName);
      res.status(200).json(stat);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
