import mongoose from 'mongoose';
import { Db } from 'mongodb';

export default async (): Promise<Db> => {
  const mongooseOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  await mongoose.connection.on('error', console.error);
  await mongoose.connection.once('open', () => {
    console.info('👍 Connected to mongod server');
  });

  const connection = await mongoose.connect(
    '',
    mongooseOption,
  );

  return connection.connection.db;
};
