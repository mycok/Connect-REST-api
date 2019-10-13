import mongoose from 'mongoose';

import config from '../config/index';
import logger from '../utils/logger';

const { mongoUri, env } = config;

const dbConnection = () => {
  mongoose.Promise = global.Promise;
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  if (env === 'testing') {
    mongoose.connect(`mongodb://${process.env.IP || 'localhost'}:${process.env.MONGO_PORT || '27017'}/mydb_test`)
      .catch((err) => {
        logger.log({ level: 'error', message: `Unable to connect to test database: ${err}` });
      });
  } else {
    mongoose.connect(`${mongoUri}`)
      .catch((err) => {
        logger.log({ level: 'error', message: `Unable to connect to database ${mongoUri}: ${err}` });
      });

    mongoose.connection.on('connected', () => {
      logger.log({ level: 'info', message: 'database connection successfully established' });
    });
  }

  return mongoose.connection;
};

export default dbConnection;
