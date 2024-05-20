import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connectToDB from './config/DBConnect.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import bookingRouter from './router/bookingRouter.js';
import futsalRouter from './router/futsalRouter.js';
import userRouter from './router/userRouter.js';

connectToDB;


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/futsal',futsalRouter);
app.use('/api/booking',bookingRouter);



app.use('/ping', function(req, res){
    res.send('/pong');
});

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);
export default app;
