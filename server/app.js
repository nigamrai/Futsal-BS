import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';
import connectToDB from './config/DBConnect.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import bookingRouter from './router/bookingRouter.js';
import router from './router/esewaRouter.js';
import futsalRouter from './router/futsalRouter.js';
import paymentRouter from './router/paymentRouter.js';
import refreshRouter from './router/refreshRouter.js';
import userRouter from './router/userRouter.js';
connectToDB;


const app = express();
const server=http.createServer(app);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
const io=new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        credentials:true,
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on("send_booked_data",(bookedData)=>{
        socket.broadcast.emit("received_booked_data",bookedData);
    })
})
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/futsal',futsalRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/booking/payment',paymentRouter);
app.use('/api/esewa',router)
app.use('/api/refresh',refreshRouter);



app.use('/ping', function(req, res){
    res.send('/pong');
});

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);
export default server;
