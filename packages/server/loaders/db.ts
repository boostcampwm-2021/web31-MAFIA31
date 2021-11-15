import mongoose from 'mongoose';
import { mongoDBURI } from '../config/db.config.json';

const dbLoader = async () => {
  const connect = () => {
    mongoose.connect(mongoDBURI!, (err) => {
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
