const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'somerandomstring',
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGO_PORT || '27017'}/connect`,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
};

export default config;
