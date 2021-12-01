import Score from '../../models/Score';

const ScoreService = {
  async updateOneOrCreate(userName: string, score: number) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const exist = await Score.findOne({ userName, date: currentDate as unknown as Date });
    if (!exist) {
      const newScore = await Score.create({ userName, score });
      return newScore;
    }
    const updateScore = await Score.updateOne(
      { userName, date: currentDate as unknown as Date },
      { score },
    );
    return updateScore;
  },
  async find(userName: string) {
    const scores = await Score.find({ userName }).sort({ date: 'asc' });
    return scores;
  },
};

export default ScoreService;
