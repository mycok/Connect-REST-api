import app from './express';
import config from '../config';
import logger from '../utils/logger';
import dbConnection from '../databse';

const { port } = config;

dbConnection();

app.listen(port, (error) => {
  if (error) {
    logger.alert(error);
  }
  logger.log({ level: 'info', message: `server running at port ${port}` });
});
