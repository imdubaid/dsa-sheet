import '@/config/config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorHandler from '@/middleware/error-handler';
import authenticate from '@/middleware/authenticate';
import auth from '@/routes/auth.route';
import user from '@/routes/user.route';
import problem from './routes/problem.route';

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000,http://localhost:3010')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/public', express.static('public'));

app.use('/auth', auth);

app.use(authenticate);

app.use('/user', user);
app.use('/problem', problem);

app.use(errorHandler);

export default app;
