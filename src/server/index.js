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
mongoose.connect(`${mongoUri}`);
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database ${mongoUri}`);
});

app.listen(port, (error) => {
  if (error) {
    logger.alert(error);
  }
  logger.log({ level: 'info', message: `server running at port ${port}` });
});
