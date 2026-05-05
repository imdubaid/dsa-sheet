import '@/config/config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authorize from '@/middleware/authorize';
import errorHandler from '@/middleware/error-handler';
import authenticate from '@/middleware/authenticate';
import auth from '@/routes/auth.route';
import user from '@/routes/user.route';

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/public', express.static('public'));

app.use('/api/auth', authorize, auth);

app.use(authenticate);

app.use('/api/user', user);

app.use(errorHandler);

export default app;
