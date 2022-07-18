import mongoose from 'mongoose';
import { mongoUrl } from '../../../../config/auth';

export const connect = (dbName: string) => {
  mongoose
    .connect(mongoUrl, {
      dbName,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to', dbName);
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...',
      );
      process.exit(0);
    });
  });
};

export default connect;
