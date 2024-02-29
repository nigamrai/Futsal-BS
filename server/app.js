import express from 'express';
import userRouter from './router/userRouter.js';
import connectToDB from './config/DBConnect.js'


connectToDB;

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});


export default app;
