import mongoose from 'mongoose';
import { url } from '../../config/db';

export default () => {
  const connect = () => {
    mongoose.connect(url, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${url}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${url}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
