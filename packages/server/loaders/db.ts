import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbLoader = async () => {
  const connect = () => {
    mongoose.connect(process.env.MONGO_DB_URI!, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('mongo db connected');
      }
    });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};

export default dbLoader;
