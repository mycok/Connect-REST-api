import mongoose from 'mongoose';

import app from './express';
import config from '../config';
import logger from '../utils/logger';

const { port, mongoUri } = config;

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(`${mongoUri}`)
  .catch((err) => {
    logger.log({ level: 'error', message: `Unable to connect to database ${mongoUri}: ${err}` });
  });

mongoose.connection.on('connected', () => {
  logger.log({ level: 'info', message: 'database connection successfully established' });
});

mongoose.connection.on('error', (err) => {
  throw new Error(`Mongoose defaul connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.log({ level: 'info', message: 'connection to the database has been disconnected' });
});

app.listen(port, (error) => {
  if (error) {
    logger.alert(error);
  }
  logger.log({ level: 'info', message: `server running at port ${port}` });
});
