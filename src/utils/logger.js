import { transports, format, createLogger } from 'winston';

const { combine, prettyPrint, timestamp } = format;

const customTransports = [
  new transports.File({
    filename: 'error.log',
    level: 'error',
  }),
  new transports.File({
    filename: 'combined.log',
    level: 'verbose',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  customTransports.push(new transports.Console());
}

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: customTransports,
});

export default logger;
