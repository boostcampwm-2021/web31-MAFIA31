import express from 'express';
import BadRequestError from '../../error/BadRequsetError';
import ScoreService from './score.service';

const ScoreController = {
  async getUserScores(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userName } = req.params;
    if (!userName) {
      next(new BadRequestError('Request not include userName'));
      return;
    }
    try {
      const scores = await ScoreService.find(userName);
      res.status(200).json({ scores });
    } catch (err) {
      next(err);
    }
  },
};

export default ScoreController;
