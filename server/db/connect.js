import mongoose from 'mongoose';

const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://e_notif_mnn:1234567@ds161630.mlab.com:61630/e-notif';

export default () => {
  const connect = () => {
    mongoose.connect(db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
