import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import connectToDB from './config/DBConnect.js'
import morgan from 'morgan';
import errorMiddleware from './middlewares/errorMiddleware.js';


connectToDB;

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL]
}))

app.use(morgan('dev'));

app.use('/api/user', userRouter);

app.use('/ping', function(req, res){
    res.send('/pong');
});

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);
export default app;
