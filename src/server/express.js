import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import UserRoutes from '../routes/user.routes';

const app = express();

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.set('strict routing', true);

app.get('/', (req, res) => {
  res.send('Welcome to the connect REST api server!!');
});

app.use('/', UserRoutes);

export default app;
